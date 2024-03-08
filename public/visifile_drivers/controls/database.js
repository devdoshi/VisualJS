function(args) {
/*
is_app(true)
component_type("VB")
hash_algorithm("SHA256")
framework("vue2")
display_name("Data control")
description("This will return the data control")
base_component_id("database_control")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
properties(
    [
        {
            id:         "connect_status",
            name:       "Connect Status",
            type:       "String",
            default:    "not_connected"
        }
        ,
        {
            id:         "connect_error",
            name:       "Connect Error",
            type:       "String",
            default:    ""
        }
        ,
        {
            id:     "sourceControlName",
            name:   "sourceControlName",
            type:   "String"
        }
        ,
        {
            id:     "sourceComponentType",
            name:   "sourceComponentType",
            type:   "String",
            default: ""
        }
        ,

        {
            id:         "width",
            name:       "Width",
            default:    250,
            type:       "Number"
        }
        ,
        {
            id:     "limit",
            name:   "Limit",
            type:   "Number",
            default_expression: "(typeof $RETURNED_ROWS_LIMIT !== 'undefined')?eval('$RETURNED_ROWS_LIMIT'):100",
        }
        ,
        {
            id:         "height",
            name:       "Height",
            default:    90,
            type:       "Number"
        }
        ,
        {
            id:     "background_color",
            name:   "Background color",
            type:   "String"
        }
        ,

        {
            id:         "has_details_ui",
            name:       "Has details UI?",
            type:       "Boolean",
            default:    true,
            hidden:     true
        }
        ,
        {
            id:     "changed_event",
            name:   "Changed event",
            type:   "Event"
        }
        ,
        {
            id:         "is_container",
            name:       "Is Container?",
            type:       "Boolean",
            default:    true,
            hidden:     true
        }
        ,
        {
            id:         "hide_children",
            name:       "Hide Children?",
            type:       "Boolean",
            default:    true,
            hidden:     true
        }
        ,
        {
            id:         "design_mode_table",
            name:       "Design Table",
            type:       "String",
            default:    "",
            hidden:     true
        }
        ,
        {
            id:         "resetColumns",
            snippet:    `resetColumns()`,
            name:       "resetColumns",
            type:       "Action"
        }
        ,
        {
            id:     "addColumn",
            name:   "addColumn",
            type:   "Action"
        }
        ,
        {
            id:     "connect",
            pre_snippet:    `await `,
            snippet:        `connect()`,
            name:   "connect",
            type:   "Action"
        }
        ,
        {
            id:     "source_type",
            name:   "Data Source Type",
            type:   "String"
        }
        ,
        {
            id:     "sql",
            name:   "SQL",
            type:   "String",
            default: ""
        }
        ,

        {
            id:     "tables",
            name:   "Tables",
            type:   "Array",
            hidden: true,
            default:    []
        }
        ,

        {
            id:      "user",
            name:    "USER",
            type:    "String",
            default_expression: "(typeof $POSTGRES_USER !== 'undefined')?eval('$POSTGRES_USER'):'postgres'"
        }
        ,
        {
            id:     "password",
            name:   "Password",
            type:   "String",
            password: true,
            default_expression: "(typeof $POSTGRES_PASSWORD !== 'undefined')?eval('$POSTGRES_PASSWORD'):'password'",
        }
        ,
        {
            id:     "database",
            name:   "Database",
            type:   "String",
            default_expression: "(typeof $POSTGRES_DATABASE !== 'undefined')?eval('$POSTGRES_DATABASE'):'postgres'",
        }
        ,
        {
            id:     "port",
            name:   "Port",
            type:   "Number",
            default_expression: "(typeof $POSTGRES_PORT !== 'undefined')?eval('$POSTGRES_PORT'):5432",
        }
        ,
        {
            id:     "host",
            name:   "Host",
            type:   "String",
            default_expression: "(typeof $POSTGRES_HOST !== 'undefined')?$POSTGRES_HOST:'localhost'",
        }
        ,
        {
            id:     "dataWindowColumns",
            name:   "dataWindowColumns",
            type:   "Array",
            hidden: true,
            default:    []
        }
        ,

        {
            id:      "data",
            name:    "data",
            type:    "Array",
            hidden:  true,
            default:  [],
            types: {table_data: true}
        }
        ,


        {
            id:     "dataWindowColumnsMax",
            name:   "dataWindowColumnsMax",
            type:   "Number",
            hidden: true,
            default:    0
        }
        ,
        {
            id:     "selected_data_window_column_index",
            name:   "selected_data_window_column_index",
            type:   "Number",
            hidden: true,
            default:    -1
        }
        ,
        {
            id:     "selected_data_window_column",
            name:   "selected_data_window_column",
            type:   "String",
            hidden: true,
            default:    ""
        }
        ,
        {
            id:     "layout",
            name:   "Layout",
            type:   "",
            hidden: false,
            type:       "Select",
            default:    "fitColumns",
            values:     [
                            {display: "Fit Columns",   value: "fitColumns"},
                            {display: "Fit Data",  value: "fitData"},
                            {display: "Fit Data Fill",  value: "fitDataFill"}


                        ]
        }

        ,
        {
            id:     "allow_col_resize",
            name:   "allow_col_resize",
            type:   "Boolean",
            hidden: true,
            default:    false
        }
        ,
        {
            id:     "allow_col_move",
            name:   "allow_col_move",
            type:   "Boolean",
            hidden: true,
            default:    false
        }
        ,
        {
            id:     "allow_row_resize",
            name:   "allow_row_resize",
            type:   "Boolean",
            hidden: true,
            default:    false
        }
        ,




        {
            id:     "tableColumnNames",
            name:   "DB Column Names",
            type:   "Array",
            hidden: true,
            default:    []
        }
        ,
        {
            id:     "databaseColumnDefitions",
            name:   "databaseColumnDefitions",
            type:   "Object",
            hidden: true,
            default:    {}
        }



        ,
        {
            id:     "where_clause",
            name:   "where_clause",
            type:   "String",
            hidden: true,
            default:    ""
        }

        ,
        {
            id:     "selected_column",
            name:   "selected_column",
            type:   "String",
            hidden: true,
            default:    ""
        }
        ,
        {
            id:         "designDetailTab",
            name:       "designDetailTab",
            type:       "String",
            hidden:     true,
            default:    "connection"
        }

        ,


        {
            id:     "result",
            name:   "result",
            type:   "Array",
            default:    []
        }
        ,
        {
            id:         "runQuery",
            pre_snippet: `await `,
            async: true,
            snippet:    `runQuery()`,
            name:       "runQuery",
            type:       "Action",
            help:       `<div>Help text for
                            <b>runQuery</b> function
                            <div>The SQL is store in the "sql" property</div>
                         </div>`
        }

        ]
)//properties
logo_url("/driver_icons/data_control.png")
*/

    Yazz.component({
        props:                  [ "meta" , "name"  , "control_properties_and_events" , "refresh" , "design_mode" , "children" ,  "runEvent" ],
        template:               ` 
<!-- ----------------------------------------------------------------
|                                    |
|    HTML FOR THE DATABASE CONTROL   |
|                                    |
|   --------------------------------
|
|  The Database control will try to ask for a connection to a 
|  database driver first
|
--------------------------------------------------------------------- -->
<div    v-bind:style='"width:100%;overflow-y:auto;height:100%;color:black;"
        v-bind:refresh='refresh'>




    <!-- ----------------------------------------------------------------
    |                                    |
    |    HTML FOR THE PANES              |
    |                                    |
    |   --------------------------------
    |
    |  Since we have multiple panes in the database control we need the 
    |  HTML for each pane here
    |
    --------------------------------------------------------------------- -->
    
    
    
    
    
    
    
    
    
    
    <!--  SELECT A PANE ---------------------------------------------------------
    |   -----------------
    |
    | This is the buttons at the top of the details page for the database control
    |
    --------------------------------------------------------------------- -->
    <div v-bind:style='"height:100%;width:100%; border: 0px;color:black;padding: 10px;"'
         v-if='design_mode == "detail_editor"'
          >

        <div v-bind:style='"height:100%;width:100%; overflow: none;"'>

            <ul class="nav nav-pills" v-bind:style='"height:20%;width:100%; overflow: none;"'>
                <li class="nav-item" style="width:20%;">
                    <a  v-bind:class='"nav-link " + ((control_properties_and_events.designDetailTab == "connection")?"active":"")'
                        v-on:click="control_properties_and_events.designDetailTab = 'connection';"
                        href="#">
                        Source
                    </a>
                </li>

                <li class="nav-item" style="width:20%;">
                    <a    v-bind:class='"nav-link " + ((control_properties_and_events.designDetailTab == "schema")?"active":"")'
                          v-on:click="switchTab('schema');"
                          href="#">Tables</a>
                </li>

                <li class="nav-item" style="width:20%;">
                    <a    v-bind:class='"nav-link " + ((control_properties_and_events.designDetailTab == "columns")?"active":"")'
                          v-on:click="control_properties_and_events.designDetailTab = 'columns';"
                          href="#">Cols</a>
                </li>

                <li class="nav-item" style="width:20%;">
                    <a    v-bind:class='"nav-link " + ((control_properties_and_events.designDetailTab == "where")?"active":"")'
                          v-on:click="control_properties_and_events.designDetailTab = 'where';"
                          href="#">Where</a>
                </li>

                <li class="nav-item" style="width:20%;">
                    <a    v-bind:class='"nav-link " + ((control_properties_and_events.designDetailTab == "options")?"active":"")'
                          v-on:click="control_properties_and_events.designDetailTab = 'options';"
                          href="#">Options</a>
                </li>
            </ul>















            <!--  CONNECTION PANE ---------------------------------------------------------
            |   -------------------
            |
            |
            --------------------------------------------------------------------- -->
            <div v-bind:style='((control_properties_and_events.designDetailTab == "connection")?"visibility:visible;":"visibility:hidden;display: none;")'
                 v-bind:refresh='refresh'
                 v-observe-visibility="visibilityChanged">

                Connection

                <div   v-if='control_properties_and_events.connect_status == "connected"'   style="background-color: green; color: white;padding:10px;">
                    Connected
                </div>

                <div   v-if='control_properties_and_events.connect_status == "not_connected"'   style="background-color: red; color: white;padding:10px;">
                    Not Connected: {{control_properties_and_events.connect_error}}
                </div>

                <select  @change='chooseSource($event)'
                          style="margin-top: 5px;">

                      <option   value=""
                              selected='true'>
                      </option>
                      <option   v-for='propVal in data_sources'
                                v-bind:value="propVal.base_component_id"
                                v-bind:selected='(propVal.base_component_id == control_properties_and_events.sourceComponentType)'>

                            {{propVal.display_name}}

                      </option>
                </select>

                <div    v-if='children && children[0]' 
                        style="width:100%; height:100%;">

                    <button     class="btn btn-primary"
                                style="margin-top: 5px;"
                                v-bind:disabled='control_properties_and_events.connect_status == "connected"'
                                v-on:click="connect">
                          Connect
                    </button>
                    
                    <button     class="btn btn-danger"
                                style="margin-top: 5px;"
                                v-on:click="disconnect">
                          Remove
                    </button>



                    <slot v-bind:refresh='refresh'>
                    </slot>

                </div>
            </div>


















            <!--  SCHEMA PANE ---------------------------------------------------------
            |   ---------------
            |
            |
            --------------------------------------------------------------------- -->
            <div v-if='control_properties_and_events.designDetailTab == "schema"'  >
               Database Tables: &#34;{{control_properties_and_events.sourceComponentType}}&#34; 
               <div style="height:70%;width:100%; overflow-y: scroll;border: 1px solid lightgray;">

                   <div   v-for='table in control_properties_and_events.tables'
                          v-on:click="selectTable( table )"
                          v-bind:style='"padding: 5px; " + ((control_properties_and_events.design_mode_table == table)?"background-color:gray;color:white;":"background-color:white;color:gray;") '>

                         {{table}}

                   </div>
               </div>
            </div>






















            <!--  COLUMNS PANE ---------------------------------------------------------
            |   ---------------
            |
            |
            --------------------------------------------------------------------- -->
            <div v-if='control_properties_and_events.designDetailTab == "columns"' >
                Table Columns: &#34;{{control_properties_and_events.design_mode_table}}&#34;
                <div>

                    <div style="height:70%;width:30%; overflow-y: scroll;display:inline-block;vertical-align:top; border: 2px solid gray;">

                        <div   v-for='column in control_properties_and_events.tableColumnNames'
                               v-on:click="control_properties_and_events.selected_column = column;"
                               v-bind:style='"padding: 5px; " + ((control_properties_and_events.selected_column == column)?"background-color:gray;color:white;":"background-color:white;color:gray;") '>

                              {{column}}

                        </div>
                    </div>

                    <div style="height:70%;width:15%; overflow-y: none;display:inline-block;vertical-align:top;">
                        <button    class="btn btn-primary"
                                :disabled="(control_properties_and_events.selected_column && control_properties_and_events.selected_column.length > 0)?false:true"
                                v-on:click="let newId = control_properties_and_events.dataWindowColumnsMax++;control_properties_and_events.dataWindowColumns.push({id:    newId, value: control_properties_and_events.selected_column, name: control_properties_and_events.selected_column});setSql();control_properties_and_events.selected_data_window_column_index = newId;control_properties_and_events.selected_data_window_column = control_properties_and_events.dataWindowColumns[control_properties_and_events.dataWindowColumns.length - 1];">

                              Add >>

                        </button>
                        <button    class="btn btn-primary"
                                style="margin-top:20px;"
                                :disabled="(control_properties_and_events.selected_data_window_column_index > -1)?false:true"
                                v-on:click="control_properties_and_events.dataWindowColumns.splice(control_properties_and_events.selected_data_window_column_index,1);setSql(); control_properties_and_events.selected_data_window_column_index = -1;control_properties_and_events.selected_data_window_column='';">

                              << Remove

                        </button>
                    </div>






                    <div style="height:30%;width:30%; overflow-y: none;display:inline-block;vertical-align:top; margin-left: 20px; border: 2px solid gray;">
                        <div style="height:100%;width:100%; overflow-y: scroll;vertical-align:top;">


                            <div    v-for='(dwcolumn,index) in control_properties_and_events.dataWindowColumns'
                                    v-on:click="control_properties_and_events.selected_data_window_column = dwcolumn;control_properties_and_events.selected_data_window_column_index = index;"
                                    v-bind:style='"padding: 5px; " + ((control_properties_and_events.selected_data_window_column.id == dwcolumn.id)?"background-color:gray;color:white;":"background-color:white;color:gray;") '>

                                  {{dwcolumn.value}}

                            </div>
                        </div>

                        <div    class="btn-group">

                            <button     class="btn btn-primary"
                                        :disabled="(control_properties_and_events.selected_data_window_column_index > 0)?false:true"
                                        style="margin-top:20px; margin-left: 0px;"
                                        v-on:click="array_move(control_properties_and_events.dataWindowColumns,control_properties_and_events.selected_data_window_column_index,control_properties_and_events.selected_data_window_column_index-1);control_properties_and_events.selected_data_window_column_index --;">

                                  Move Up

                            </button>

                            <button class="btn btn-primary"
                                    :disabled="((control_properties_and_events.selected_data_window_column_index > -1) && (control_properties_and_events.selected_data_window_column_index < (control_properties_and_events.dataWindowColumns.length - 1)))?false:true"
                                    style="margin-top:20px; margin-left: 20px;"
                                    v-on:click="array_move(control_properties_and_events.dataWindowColumns,control_properties_and_events.selected_data_window_column_index,control_properties_and_events.selected_data_window_column_index + 1);control_properties_and_events.selected_data_window_column_index ++;">

                                  Move Down

                            </button>
                        </div>



                        <div   style=" border: 1px solid lightgray;height:90%;width:100%; display:inline-block;margin-top:20px;overflow-y:scroll;">

                            <div    v-if="control_properties_and_events.selected_data_window_column"
                                    style="height:100%;width:100%; overflow-y: none; padding: 10px;">

                                <div class="form-group">


                                  <label for="col_input_name">Title</label>
                                  <input  type=text
                                          class="form-control"
                                          style="margin-bottom: 30px;"
                                          id=col_input_name
                                          name="col_input_name"
                                          required
                                          v-bind:value='control_properties_and_events.selected_data_window_column.name'
                                          v-on:change="let qwe = document.getElementById('col_input_name').value;control_properties_and_events.dataWindowColumns[control_properties_and_events.selected_data_window_column_index].name=qwe;control_properties_and_events.selected_data_window_column.name = qwe;"
                                           />




                                  <label for="col_input_value">DB Col ID</label>
                                  <input  type=text
                                          class="form-control"
                                          id=col_input_value
                                          style="margin-bottom: 30px;"
                                          name="col_input_value"
                                          required
                                          v-bind:value='control_properties_and_events.selected_data_window_column.value'

                                          v-on:change="let qwe = document.getElementById('col_input_value').value;control_properties_and_events.dataWindowColumns[control_properties_and_events.selected_data_window_column_index].value=qwe;control_properties_and_events.selected_data_window_column.value = qwe;"
                                           />



                                  <div class="valid-feedback">Valid.</div>
                                  <div class="invalid-feedback">Please fill out this field.</div>


                                    <label for="col_input_width">Col Width px</label>
                                    <input  type=text
                                            style="margin-bottom: 30px;"
                                            class="form-control"
                                            id=col_input_width
                                            name="col_input_width"
                                            v-bind:value='control_properties_and_events.selected_data_window_column.width?control_properties_and_events.selected_data_window_column.width:""'

                                            v-on:change="let qwe = document.getElementById('col_input_width').value;control_properties_and_events.selected_data_window_column.width = qwe;control_properties_and_events.dataWindowColumns[control_properties_and_events.selected_data_window_column_index].width=qwe;"
                                             />
                              </div>




                            </div>


                            <div   v-if="!control_properties_and_events.selected_data_window_column"  style="height:100%;width:100%; overflow-y: none;margin-top:0px;border: 1px solid lightgray;">

                            </div>
                        </div>


                    </div>






                </div>
            </div>






















            <!--  WHERE CLAUSE PANE ---------------------------------------------------------
            |   ---------------------
            |
            |
            --------------------------------------------------------------------- -->
            <div v-if='control_properties_and_events.designDetailTab == "where"'  >

                <label for="col_input_width">Where Clause</label>
                <input  type=text
                        style="margin-bottom: 30px;"
                        class="form-control"
                        id=where_clause
                        name="where_clause"
                        v-bind:value='(control_properties_and_events.where_clause && (control_properties_and_events.where_clause.length > 0))?control_properties_and_events.where_clause:""'

                        v-on:change="control_properties_and_events.where_clause = document.getElementById('where_clause').value;setSql()"
                        />
            </div>



















            <!--  OPTIONS PANE ---------------------------------------------------------
            |   ---------------
            |
            |
            --------------------------------------------------------------------- -->
            <div v-if='control_properties_and_events.designDetailTab == "options"'  >
                Options tab

                <form>
                  <div class="form-group">


                      <div class="form-check">
                        <input  type="checkbox" class="form-check-input" id="allow_col_resize"
                                :checked='control_properties_and_events.allow_col_resize' v-model='control_properties_and_events.allow_col_resize'>
                        <label class="form-check-label" for="allow_col_resize">Allow col resize</label>
                      </div>


                      <div class="form-check">
                        <input  type="checkbox" class="form-check-input" id="allow_col_move"
                                :checked='control_properties_and_events.allow_col_move' v-model='control_properties_and_events.allow_col_move'>
                        <label class="form-check-label" for="allow_col_move">Allow col move</label>
                      </div>


                      <div class="form-check">
                        <input  type="checkbox" class="form-check-input" id="allow_row_resize"
                                :checked='control_properties_and_events.allow_row_resize' v-model='control_properties_and_events.allow_row_resize'>
                        <label class="form-check-label" for="allow_row_resize">Allow row resize</label>
                      </div>



                </form>
            </div>




        </div>

    </div>











    <div v-else>


        <div v-bind:style='"height:100%;width:100%; border: 0px;" +
                           "background-color: "+    control_properties_and_events["background_color"]  +  ";"'
             v-if='design_mode == false'>


             <div    v-if='children && children[0]'
                     v-bind:refresh='refresh'
                     hidden>

                 <slot v-bind:refresh='refresh'>
                 </slot>
             </div>

        </div>




         <div v-bind:style='"height:100%;width:100%; border: 0px;" +
                            "background-color:white;color:black;"'
              v-else>

                      <div   v-for='propVal in data_sources'>
                            <b v-if='(propVal.base_component_id == control_properties_and_events.sourceComponentType)'>
                                {{propVal.display_name}}
                            </b>
                      </div>
                      <b v-if='!control_properties_and_events.sourceComponentType || (control_properties_and_events.sourceComponentType == "")'>
                          No data source selected
                      </b>
                      <br/>

                     <b>SQL:</b>
                        {{control_properties_and_events.sql}}
         </div>

     </div>





</div>`,
        data:                   function        (  )  {
            return {
                selected_index:         null,
                data_sources:           []
            }
        },
        watch:                  {
            // This would be called anytime the value of the input changes
            refresh: function(newValue, oldValue)
            {
                //console.log("refresh: " + this.control_properties_and_events.text)
                if (isValidObject(this.control_properties_and_events)) {
                    //this.getTables()
                    //alert(JSON.stringify(this.tables,null,2))
                }
            }
        },
        beforeDestroy:          async function  (  ) {
            console.log('beforeDestroy');
            await this.minimizeChildren()
        },
        mounted:                async function  (  ) {
            let mm = this
            await registerComponent(this)
            if (mm.design_mode == "detail_editor") {
                mm.switchTab( mm.control_properties_and_events.designDetailTab )
            }
            //let listLL = await findComponentsImplementing(["runQuery","connect"])
            let listLL  =
            {
                values:
                 [
                     { base_component_id: "yazz_sqlite_client_component" , display_name: "Yazz SQLite Connector" },
                     { base_component_id: "mysql_client_component" , display_name: "MySQL Client" }
                 ]
            }
            mm.data_sources = listLL.values

            if (isValidObject(mm.control_properties_and_events)) {
            }

            if (mm.design_mode == "never") {
                mm.table = new Tabulator(mm.$refs.exampletable,
                {
                    width:                      this.control_properties_and_events.width,
                    height:                     this.control_properties_and_events.height,
                    tables:                     [],
                    data:                       this.control_properties_and_events.data,
                	layout:                     "fitColumns",
                	responsiveLayout:           "hide",
                	tooltips:                   true,
                	addRowPos:                  "top",
                	history:                    true,
                	pagination:                 "local",
                	paginationSize:             7,
                	movableColumns:             true,
                    resizableColumns:           this.control_properties_and_events.allow_col_resize,
                	resizableRows:              this.control_properties_and_events.allow_row_resize,
                    movableColumns:             this.control_properties_and_events.allow_col_move,
                    layout:                     this.control_properties_and_events.layout,
                    tableNames:                 [],
                	initialSort:                [],
                    columns:                    []
                });
            }
            if (mm.design_mode) {
                //await this.getTables()
            }

            if (!mm.design_mode) {
                //hack city!!!! This should not be done via timeout, but via some
                // sort of callback. The reason a timeout is needed here is because
                // other uninitialised (as of yet) controls on the same form are
                // referenced
                setTimeout(async function(){
                    await mm.connect()
                    await mm.runQuery()
                },300)
                //alert(JSON.stringify(results,null,2))
            }
        },
        methods:                {
            switchTab:          async function  (  tabName  ) {
                let mm = this
                if (tabName == "schema") {
                    await mm.getTables()
                } else if (tabName == "connection") {
                    await mm.getTables()
                    await this.meta.getEditor().selectComponentByName(mm.control_properties_and_events.sourceControlName)
                } else {
                    await mm.getTables()
                }
                mm.control_properties_and_events.designDetailTab = tabName
            },
            chooseSource:       async function  (  event  ) {
                //----------------------------------------------------------------------------------/
                //
                //                    /-------------------------------------/
                //                   /            chooseSource             /
                //                  /-------------------------------------/
                //
                //----------------------------------------------------------------------------/
                // When a driver is chosen from the drop down list of the database control
                // then a new control is created for the database driver and placed under
                // the database control
                //--------------------------------------------------------------------------/
                let mm = this
                let typeName = event.target.value
                await GLOBALS.makeSureUiComponentLoadedV6([typeName])
                mm.control_properties_and_events.sourceControlName = typeName + "_" + this.meta.getEditor().getNextComponentid()
                mm.control_properties_and_events.sourceComponentType = typeName
                await this.meta.getEditor().addControl(
                    {
                            "leftX":                    10,
                            "topY":                     10,
                            width:                      "100%",
                            show_connected_ui:          false,
                            "name":                     mm.control_properties_and_events.sourceControlName,
                            "base_component_id":        typeName,
                            parent_base_component_id:   mm.control_properties_and_events.base_component_id,
                            parent_name:                mm.control_properties_and_events.name,
                            standalone_ui:              false
                          }
                )
                //debugger
              //await mm.meta.getEditor().updateComponentMethods()
                let newcontrol =  mm.meta.lookupComponent(mm.control_properties_and_events.sourceControlName)
                //newcontrol.height = 700
            },
            connect:            async function  (  ) {
                //----------------------------------------------------------------------------------/
                //
                //                    /-------------------------------------/
                //                   /                 connect             /
                //                  /-------------------------------------/
                //
                //----------------------------------------------------------------------------/
                // This is called when the database control tries to call out to a SQL
                // driver
                //--------------------------------------------------------------------------/
                let mm = this
                let newcontrol =  mm.meta.lookupComponent(mm.control_properties_and_events.sourceControlName)
                if (newcontrol) {
                    let connected = await newcontrol.connect()
                    if (connected == false) {
                        if (newcontrol &&
                            newcontrol.result &&
                            newcontrol.result.failed &&
                            newcontrol.result.failed.routine) {
                            mm.control_properties_and_events.connect_error = JSON.stringify(newcontrol.result.failed.routine,null,2)


                        } else if (newcontrol && newcontrol.error) {
                            mm.control_properties_and_events.connect_error = newcontrol.error
                        }
                        mm.control_properties_and_events.connect_status = "not_connected"
                        newcontrol.show_connected_ui = false

                    } else {
                        mm.control_properties_and_events.connect_error = ""
                        await mm.getTables()
                        mm.control_properties_and_events.connect_status = "connected"
                        newcontrol.show_connected_ui = true
                    }
                }
            },
            disconnect:         async function  (  ) {
                let mm = this
                mm.control_properties_and_events.connect_status = "not_connected"
                mm.control_properties_and_events.connect_error = ""
                //let newcontrol =  mm.meta.lookupComponent(mm.control_properties_and_events.sourceControlName)
                await this.meta.getEditor().deleteComponentByName(mm.control_properties_and_events.sourceControlName)
                mm.control_properties_and_events.sourceControlName == ""
                mm.control_properties_and_events.sourceComponentType = ""
            },
            setSql:             function        (  ) {
                let mm = this
                let colSql = "*"
                if (this.control_properties_and_events.dataWindowColumns.length > 0) {
                    colSql = ""
                    for (let coli=0; coli < this.control_properties_and_events.dataWindowColumns.length; coli ++) {
                        colSql += this.control_properties_and_events.dataWindowColumns[coli].value
                        if (coli< (this.control_properties_and_events.dataWindowColumns.length - 1)) {
                            colSql += ","
                        }
                    }
                }
                this.control_properties_and_events.sql = "select " + colSql + " from " + this.control_properties_and_events.design_mode_table

                if (this.control_properties_and_events.where_clause && (this.control_properties_and_events.where_clause.length > 0)) {
                    this.control_properties_and_events.sql += " where " + this.control_properties_and_events.where_clause
                }


            },
            changedFn:          function        (  ) {
                let mm = this
                if (isValidObject(this.control_properties_and_events)) {
                }
            },
            resetColumns:       async function  (  data  ) {
                let mm = this
                this.table.setColumns([])
            },
            addColumn:          async function  (  colData  ) {
                let mm = this
                this.table.addColumn(colData, true, "name");
            },
            runEventHandler:   async function        (  ) {
                let mm = this
                await this.runEvent({ display: "changed",   code: this.control_properties_and_events.changed_event })
            },
            array_move:         function        (  arr  ,  old_index  ,  new_index  ) {
                let mm = this
                if (new_index >= arr.length) {
                    let k = new_index - arr.length + 1;
                    while (k--) {
                        arr.push(undefined);
                    }
                }
                arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                return arr; // for testing
            },
            getTables:          async function  (  ) {
                let mm = this
                if (this.design_mode) {
                    let newcontrol =  mm.meta.lookupComponent(mm.control_properties_and_events.sourceControlName)
                    if (newcontrol) {
                        let result = await newcontrol.getTables()

                        console.log(JSON.stringify(result,null,2))
                        if (result) {
                            this.control_properties_and_events.tables = []
                            //alert(JSON.stringify(result,null,2))
                            for (let i=0;i<result.length;i++) {
                                this.control_properties_and_events.tables.push(result[i].name)
                            }
                        }
                    }
                }
            },
            generateColumns:    async function  (  ) {
                let mm = this
                if (this.design_mode) {
                    let newcontrol =  mm.meta.lookupComponent(mm.control_properties_and_events.sourceControlName)
                    newcontrol.design_mode_table = mm.control_properties_and_events.design_mode_table
                    let result = await newcontrol.getColumns()
                    this.control_properties_and_events.tableColumnNames = result
                }
            },
            runQuery:           async function  (  ) {
                let mm = this
                let newcontrol =  mm.meta.lookupComponent(mm.control_properties_and_events.sourceControlName)
                newcontrol.sql = mm.control_properties_and_events.sql
                newcontrol.select_columns = mm.control_properties_and_events.dataWindowColumns
                newcontrol.select_table = mm.control_properties_and_events.design_mode_table

                let result = await newcontrol.runQuery()
                this.control_properties_and_events.result = result
                this.control_properties_and_events.data = result
                return this.control_properties_and_events.result
            },
            visibilityChanged:  function        (  isVisible  ,  entry  ) {
                let mm = this
                //this.isVisible = isVisible
                //console.log(Math.round(entry.intersectionRatio * 100) + '%')
                console.log("isVisible: " + isVisible)
                if (isVisible) {
                    this.maximizeChildren()
                } else {
                    this.minimizeChildren()
                }
            },
            minimizeChildren:   async function  (  ) {
                let mm = this
                if (mm.control_properties_and_events.sourceControlName) {
                    let newcontrol =  mm.meta.lookupComponent(mm.control_properties_and_events.sourceControlName)
                    if (newcontrol) {
                        //newcontrol.width = 10
                        //newcontrol.height = 10
                    }
                }
            },
            maximizeChildren:   async function  (  ) {
                let mm = this
                if (mm.control_properties_and_events.sourceControlName) {
                    let newcontrol =  mm.meta.lookupComponent(mm.control_properties_and_events.sourceControlName)
                    if (newcontrol) {
                        newcontrol.width = 600
                        newcontrol.height = 600
                    }
                }
            },
            selectTable:        async function  (  table  ) {
                let mm = this
                mm.control_properties_and_events.design_mode_table = table
                mm.control_properties_and_events.sql = 'select * from ' + table;
                await mm.generateColumns(  )
            }
        }
    })
}
