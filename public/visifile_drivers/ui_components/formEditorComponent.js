async function component( args ) {
/*
base_component_id("form_editor_component")
load_once_from_file(true)
*/

    //alert(JSON.stringify(args,null,2))
    var uid2 = uuidv4()
    var mm = null
    var texti = null
    if (args) {
        texti = args.text
    }
    var designMode = true
    Vue.component("form_editor_component",
    {
    //*** COPY_START ***//
      template: `<div>
                    <div v-if='design_mode'  class='display-4'>Form editor</div>
                    <div v-if='!design_mode'  class='display-4'>MY FORM</div>

                    <div v-bind:id='uid2' >
                        <div v-for='field in model.fields' style='padding: 5px;'>
                            <div class='container'>
                                <div class='row'>
                                    <div class='col-md-6' v-if='field.type=="text"'>{{field.text}}</div>
                                    <div class='col-md-6' v-if='field.type=="input"'>{{field.label}}<input></input></div>
                                    <div class='col-md-2'></div>
                                    <button class='xs-4'  v-if='design_mode' type=button class='btn btn-sm btn-info'      v-on:click='deleteField(field.id)'  > - </button>
                                    </div>
                                </div>
                            </div>
                        <button  v-if='design_mode' type=button class='btn btn-primary btn-lg'      v-on:click='addField()'  >+</button>
                    </div>
                    <hr />


                     <slot v-if='text' :text2="text"></slot>
                 </div>`
        ,

        mounted: function() {
            mm = this
            document.getElementById(uid2).style.width="100%"

            document.getElementById(uid2).style.height="45vh"

            if (texti) {
                var json2 = this.getJsonModelFromCode(  texti  )
                mm.model = json2
                mm.edited_app_component_id = yz.getValueOfCodeString(texti, "base_component_id")

                this.generateCodeFromModel(  json2  )
             //alert(this.text)
         }



         //editor.getSession().on('change', function() {
            //mm.text = editor.getSession().getValue();
            //alert("changed text to : " + mm.text)
         //   });
     },
     methods: {
        addField() {
            mm.model.fields.push({   id: mm.model.next_id,   type: "input",   label: "DOB"   })
            mm.model.next_id ++
            this.generateCodeFromModel(  mm.model  )
            //alert("Added: " + JSON.stringify(mm.model,null,2))
        },
        deleteField(   fieldId   ) {
            var itemD = null
            for (var tt=0; tt < mm.model.fields.length ; tt++) {
                var ciurr = mm.model.fields[tt]
                if (ciurr.id == fieldId) {
                    itemD = ciurr
                }
            }
            if (itemD) {
                var index = mm.model.fields.indexOf(  itemD  );
                if (index > -1) {
                  mm.model.fields.splice(index, 1);
                }
            }

            this.generateCodeFromModel(  mm.model  )
            //alert("Added: " + JSON.stringify(mm.model,null,2))
        },
        getText: function() {
            return this.text
        },
        setText: function(textValue) {
            this.text =  textValue
            var json2 = this.getJsonModelFromCode(  textValue  )
            mm.model = json2
            this.generateCodeFromModel(  json2  )
        }
        ,
        getJsonModelFromCode: function(  codeV  ) {
            var json2 = yz.getValueOfCodeString(codeV,"formEditor",")//formEditor")
            return json2
        }

        ,
        generateCodeFromModel: async function(  jsonModel  ) {
            var startIndex = this.text.indexOf("//** gen_" + "start **//")
            var endIndex = this.text.indexOf("//** gen_" + "end **//")

            //zzz
            var sql =    "select  cast(code as text)  as  code  from  system_code  where " +
                         "        base_component_id = 'form_editor_component'   and   code_tag = 'LATEST' "

            var results = await callComponent({ base_component_id:    "readFromInternalSqliteDatabase" },
                {   sql: sql  })

            var editorCode = results[0].code
            var stt = "//*** COPY_" + "START ***//"
            var editorCodeToCopyStart = editorCode.indexOf(stt) + stt.length
            var editorCodeToCopyEnd = editorCode.indexOf("//*** COPY_" + "END ***//")
            var editorCodeToCopy = editorCode.substring(editorCodeToCopyStart, editorCodeToCopyEnd)
            console.log(editorCodeToCopy)
            //alert(JSON.stringify(mm.model,null,2))

            this.text = this.text.substring(0,startIndex) +

                `//** gen_start **//
                var uid2 = uuidv4()
                var mm = null
                var texti = null
                var designMode = false
                Vue.component('${this.edited_app_component_id}', {`

                + editorCodeToCopy +

                `,
                data: function () {
                  return {
                      design_mode: designMode,
                      text: texti,
                      uid2: uid2,
                      model: `

                      + JSON.stringify(mm.model,null,2) +

                  `}
                }
              })`

              +
              this.text.substring(endIndex)
              //console.log(this.text)

              this.text = yz.deleteCodeString(  this.text, "formEditor", ")//form" + "Editor")

              this.text = yz.insertCodeString(  this.text,
                                                        "formEditor",
                                                        mm.model,
                                                        ")//form" + "Editor")
        }

     }
     //*** COPY_END ***//
     ,
     data: function () {
       return {
           design_mode: designMode,
           edited_app_component_id: null,
           text:        texti,
           uid2:        uid2,
           model:       {
                            next_id: 1,
                            fields: [
                                    ]
           }
       }
     }


    }
    )

}
