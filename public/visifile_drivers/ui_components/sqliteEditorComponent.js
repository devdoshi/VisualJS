function component( args ) {
/*
base_component_id("sqlite_editor_component")
component_type("SYSTEM")
load_once_from_file(true)
*/

    let newEditorDomId     = uuidv4()


    Vue.component("sqlite_editor_component", {
      data: function () {
        return {
            text:           args.text,
            read_only:      false,
            editorDomId:    newEditorDomId,
            errors:         null,
            sqlText:        "{}",
            editor:         null
        }
      },
      template: `<div style='background-color:white; ' >
                      <div style='box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);background-color: lightgray; padding: 5px;padding-left: 15px;border: 4px solid lightgray;' >
                          <slot style='box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);display: inline-block;' v-if='text' :text2="text">
                          </slot>
                      </div>

                      <div style='border-radius: 5px;margin-left:15px;margin-top:15px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);border: 4px solid lightgray; '>
                          <div    style='font-size:14px;font-weight:bold;border-radius: 0px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);background-image: linear-gradient(to right,  #000099, lightblue); color: white; border: 0px solid lightgray; padding:4px; margin:0;padding-left:14px;'>

                               Editor
                          </div>

                        <div    v-bind:id='editorDomId' >
                        </div>

                        <pre    v-on:click="gotoLine(errors.lineNumber)"
                                style="background:pink;color:blue;"
                                v-if="errors != null">Line {{errors.lineNumber}}: {{errors.description}}</pre>

                    </div>
                    <hr></hr>
                 </div>`
     ,

     mounted: function() {
         let thisVueInstance = this
         args.text           = null
         disableAutoSave     = true

         ace.config.set('basePath', '/');
         editor = ace.edit(           editorDomId, {
                                                 selectionStyle: "text",
                                                 mode:           "ace/mode/javascript"
                                             })

         //Bug fix: Need a delay when setting theme or view is corrupted
         setTimeout(function(){
            editor.setTheme("ace/theme/sqlserver");

            let langTools = ace.require("ace/ext/language_tools");
            editor.setOptions({
               enableBasicAutocompletion: true,
               enableSnippets: true,
               enableLiveAutocompletion: false
            });

         },100)



         document.getElementById(editorDomId).style["font-size"] = "16px"
         document.getElementById(editorDomId).style.width="100%"
         document.getElementById(editorDomId).style["border"] = "0px"

         document.getElementById(editorDomId).style.height="65vh"
         if (isValidObject(thisVueInstance.text)) {
             editor.getSession().setValue(thisVueInstance.sqlText);
             this.read_only = saveHelper.getValueOfCodeString(thisVueInstance.text, "read_only")
         }

         editor.getSession().setUseWorker(false);
         if (this.read_only) {
            editor.setReadOnly(true)
         }


         editor.getSession().on('change', function() {
            let haveIChangedtext = false
            if (thisVueInstance.sqlText != editor.getSession().getValue()) {
              haveIChangedtext = true
            }
            thisVueInstance.sqlText = editor.getSession().getValue();
            thisVueInstance.errors = null
            if (!isValidObject(thisVueInstance.sqlText)) {
                return
            }
            if (thisVueInstance.sqlText.length == 0) {
                return
            }
            try {
               let newNode = esprima.parse("(" + thisVueInstance.sqlText + ")", { tolerant: true })
               //alert(JSON.stringify(newNode.errors, null, 2))
               thisVueInstance.errors = newNode.errors
               if (thisVueInstance.errors) {
                    if (thisVueInstance.errors.length == 0) {
                        thisVueInstance.errors = null
                        if (haveIChangedtext) {
                          thisVueInstance.$root.$emit(
                            'message', {
                                            type:   "pending"
                                       })
                        }
                    } else {
                        thisVueInstance.errors = thisVueInstance.errors[0]
                    }
               }
            } catch(e) {
               //alert(JSON.stringify(e, null, 2))
               thisVueInstance.errors = e
            }
         });

        editor.resize(true);
        editor.focus();
     },
     methods: {
        gotoLine: function(line) {
            editor.gotoLine(line , 10, true);
        }
        ,



        // -----------------------------------------------------
        //                      getText
        //
        // This is called to get the SQL definitions
        //
        //
        //
        // -----------------------------------------------------
        getText: async function() {
            if (!isValidObject(this.text)) {
                return null
            }

            this.text = saveHelper.deleteCodeString(this.text, "sqlite", ")//sqlite")
            this.text = saveHelper.insertCodeString(this.text, "sqlite", JSON.parse(this.sqlText) ,")//sqlite")

            return this.text
        }
        ,



        // -----------------------------------------------------
        //                      setText
        //
        // This is called to set the SQL
        //
        //
        //
        // -----------------------------------------------------
        setText: function(textValue) {
            let thisVueInstance = this
            this.text           =  textValue

            if (!isValidObject(this.text)) {
                return
            }

            //
            // set the editor to read only if in read only mode
            //


            this.read_only = saveHelper.getValueOfCodeString(thisVueInstance.text, "read_only")
            if (this.read_only) {
               editor.setReadOnly(true)
            }





            //
            // If a database definition has been given then read it
            //

            let llsqlText = saveHelper.getValueOfCodeString(textValue, "sqlite", ")//sqlite")
            if (isValidObject(llsqlText)) {
                editor.getSession().setValue(  JSON.stringify(  llsqlText , null , 2  ));
            } else {
                editor.getSession().setValue(  JSON.stringify(  [] , null , 2  ));
            }
        }

     }


    })

}
