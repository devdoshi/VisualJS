{
    name: 'word'
    ,
    version: 1
    ,
    vue: {
            template:
'<div>'+
'     <table class="table table-striped table-bordered " style="width: 100%;">'+
'        <tbody>'+
'          <tr scope="row"><td>Type</td><td>Word</td></tr>'+
'          <tr scope="row"><td>ID</td><td>{{get_connection_property(connection_name,"id")}}</td></tr>'+
'          <tr scope="row"><td>File</td><td>{{get_connection_property(connection_name,"fileName")}}</td></tr>'+
'          <tr scope="row"><td>Size</td><td>{{get_connection_property(connection_name,"size")}}</td></tr>'+
'          <tr scope="row"><td>Hash</td><td>{{get_connection_property(connection_name,"hash")}}</td></tr>'+
'<FileBrowser></FileBrowser>'+
'        </tbody>'+
'      </table>'+
'</div>'
			,
			props: ['connection_name']
			,
			methods: {
				get_connection_property: function (cn, prop_name) {
				  var cc;
				  for (cc in this.$store.state.list_of_connections) {
					if (this.$store.state.list_of_connections[cc].id == cn) {
					  return this.$store.state.list_of_connections[cc][prop_name];
					};
				  };
				  return 'Unknown ' + cn + ":" + prop_name;
				},
				OK: function() {
				  this.$store.dispatch('add_connection', {cn: this.connection_name, cp: {name: this.connection_name, base_component_id: this.connection_driver}})
				  this.$store.dispatch('hide_add_connection')
				},
				Cancel: function() {
				  this.$store.dispatch('hide_add_connection')
				}
			  }
			}
    ,
    vue_add: {
            template:   '' +
'    <div>' +
'        <div class="input-group">' +
'            <div class="form-group">' +
'                <label for="ID" class=" col-form-label">Connection name</label>' +
'                <input  type="text" class="form-control" v-model="connection_name" />' +
'            </div>' +
'' +
'            <div class="form-group">' +
'                <label for="FileItem" class="col-form-label">File name</label>' +
'                <input id="FileItem"  type="text"  class="form-control"  v-model="file" />' +
'            </div>' +
'' +
'            <div class="form-group row">' +
'                <span class="input-group-btn">' +
'                    <button class="btn btn-secondary" type="button" v-on:click="OK">OK</button>' +
'                    <button class="btn btn-secondary" type="button" v-on:click="Cancel">Cancel</button>' +
'                </span>' +
'            </div>' +
'        </div>' +
'' +
'    </div>' +
'</div>'


			,
			name: 'word-add-connection'
			,
			  props: []
			  ,
			  methods: {
				  onFileChange: function(e) {
					  var files = e.target.files || e.dataTransfer.files;
					  if (!files.length)
						return;
					 this.fileName = document.getElementById('FileItem').value;
					},
				get_connection_property: function (cn, prop_name) {
				  for (cc in this.$store.state.list_of_connections) {
					if (this.$store.state.list_of_connections[cc].id == cn) {
						alert(this.$store.state.list_of_connections[cc][prop_name]);
					  return this.$store.state.list_of_connections[cc][prop_name];
					};
				  };
				  return 'Unknown ' + cn + ":" + prop_name;
				},
				OK: function() {
				  this.$store.dispatch('add_new_connection',
				  {
					  cn: this.connection_name,
					  cp: {
						  name:      this.connection_name,
						  base_component_id:    'word',
						  fileName:  this.file
					  }
				  });
				  this.$store.dispatch('hide_add_connection');
				}
				,
				Cancel: function() {
				  this.$store.dispatch('hide_add_connection');
				}
			  }
			  ,

			  data: function() {
				return {
				  connection_name:           "Word connection",
				  file:                       null
				};
			  }
	}

    ,
    vue_add_query: {
            template:   '' +
						'<div>' +
						'    <div class="input-group">' +
						'        <div class="form-group">' +
						'            <label for="ID" class=" col-form-label">Query name</label>' +
						'            <input  type="text" class="form-control" v-model="query_name" />' +
						'        </div>' +
						'        <div class="form-group row">' +
						'            <span class="input-group-btn">' +
						'                <button class="btn btn-secondary" type="button" v-on:click="OK">OK</button>' +
						'                <button class="btn btn-secondary" type="button" v-on:click="Cancel">Cancel</button>' +
						'            </span>' +
						'        </div>' +
						'    </div>' +
						'</div>'


			,
			name: 'word-add-query'
			,
			props: ['query_connection']
			,
			methods: {
				get_connection_property: function (cn, prop_name) {
				  for (cc in this.$store.state.list_of_connections) {
					if (this.$store.state.list_of_connections[cc].id == cn) {
					  return this.$store.state.list_of_connections[cc][prop_name];
					};
				  };
				  return 'Unknown ' + cn + ":" + prop_name;
				},
				OK: function() {
				  this.$store.dispatch('add_new_query',
					  {
						  name:             this.query_name,
						  connection:     this.query_connection,
						  base_component_id:        'word',
						  type:          '|SPREADSHEET|',
						  definition:    JSON.stringify({} , null, 2),
					  }
				  );
				  this.$store.dispatch('hide_add_query');
				}
				,
				Cancel: function() {
				  this.$store.dispatch('hide_add_query');
				}
			  }
			  ,
			  data: function() {
				return {
				  query_name:                "word query",
				};
			  }
	}

    ,
    vue_view_query: {
            template:
'<div>'+
'     <table class="table table-striped table-bordered " style="width: 100%;">'+
'        <tbody>'+
'          <tr scope="row"><td>ID</td><td>{{get_query_property(query_name,"id")}}</td></tr>'+
'          <tr scope="row"><td>Name</td><td>{{get_query_property(query_name,"name")}}</td></tr>'+
'          <tr scope="row"><td>base_component_id</td><td>word</td></tr>'+
'          <tr scope="row"><td>Size</td><td>{{get_query_property(query_name,"size")}}</td></tr>'+
'          <tr scope="row"><td>Preview</td><td>{{get_query_property(query_name,"preview")}}</td></tr>'+
'          <tr scope="row"><td>Hash</td><td>{{get_query_property(query_name,"hash")}}</td></tr>'+
'        </tbody>'+
'      </table>'+
'</div>'
			,
			props: ['query_name']
			,
			methods: {
				get_query_property: function (cn, prop_name) {
                    var query = window.sqlGetQueryById(cn);

                    if (query != null) {
                        return query[prop_name];
                    }
				    return 'Unknown ' + cn + ":" + prop_name;
				},
				OK: function() {
				  this.$store.dispatch('hide_view_query')
				},
				Cancel: function() {
				  this.$store.dispatch('hide_view_query')
				}
			  }
			}
    ,
    type: 'document_driver'
    ,
    setup: function(connection) {
          var config = {
            id:                connection.id,
            file:              connection.file
          };

          connection.connection = new Object();
          connection.status = 'connected';
      },



    get_v2: function( connection , parameters , callfn )
        {
            //console.log('********************************');
            //console.log('********************************');
            //console.log('****     LOADING WORD  *********');
            //console.log('****     LOADING WORD  *********' + connection.fileName);
            //console.log('********************************');
            //console.log('********************************');



			var rows=[];

            try {
                mammoth.extractRawText({path: connection.fileName})
                    .then(function(result){
                        var text = result; // The raw text
                        var messages = result.messages;
                        var many = text.split("\n")

                        var countc = many.length;
                        //console.log("DocX word count: " + countc );
                        for (var f = 0 ; f < countc; f ++ ) {
                            var textline  = many[f];
                            if (textline && (textline.length > 10)) {
                                //console.log("Word text length " + f + ": " + textline.length);
                                rows.push({value: textline});
                            }
                        }
                        callfn(rows);
                    }).catch(function(err) {
                        callfn({error: 'Word error: ' + err});
                    })
                    .done();

			}
			catch(err) {
				callfn({error: 'Word error: ' + err});
			}
          }








          ,

          events: {

                "Return Word DocX Data":
                {
                    on: "can_handle_docx",
                    do: async function(args) {
                    console.log("Return Word DocX Data: 1 ")
                        var promise = new Promise(success => {
                            var fileName = args.fileName
                			var rows = [];

                            try {
                                mammoth.extractRawText({path: fileName})
                                    .then(function(result){
                                        var text = result; // The raw text
                                        var messages = result.messages;
                                        var many = text.split("\n")

                                        var countc = many.length;
                                        //console.log("DocX word count: " + countc );
                                        for (var f = 0 ; f < countc; f ++ ) {
                                            var textline  = many[f];
                                            if (textline && (textline.length > 10)) {
                                                //console.log("Word text length " + f + ": " + textline.length);
                                                rows.push({value: textline});
                                            }
                                        }
                                        console.log("Return Word DocX Data: 6 " + JSON.stringify(rows,null,2))
                                        success(rows);
                                    }).catch(function(err) {
                                        console.log("Return Word DocX Data: 5 " + err)
                                        success({error: 'Word error: ' + err});
                                    })
                                    .done();

                			}
                			catch(err) {
                                console.log("Return Word DocX Data: 4 " + err)
                				success({error: 'Word error: ' + err});
                			}
                          })
                          console.log("Return Word DocX Data: 2 ")
                          var ret  = await promise
                          console.log("Return Word DocX Data: 3 ")
                          return ret
                      }

                      ,
                    end: null
                }


                ,

                "Content preview for docx": {
                    on: "content_preview_for_docx"
                    ,
                    do: async function(args) {
                    var promise = new Promise(returnFn => {
                        var hash = args.hash
                        var stmt = dbsearch.all(
                            "select   content   from   contents_2   where   id = ? limit 1"
                            ,
                            hash
                            ,
                            function(err, rows) {
                                if (!err) {
                                    if (rows.length > 0) {
                                        var contentRow = rows[0];
                                        var buffer = new Buffer(rows[0].content, 'binary');

                                        mammoth.convertToHtml({buffer: buffer})
                                        .then(function(result){
                                            var html = result; // The generated HTML
                                            var messages = result.messages; // Any messages, such as warnings during conversion

                                            returnFn({
                                                html:  html

                                            });
                                        })
                                        .done();
                                    }
                                }
                            })

                    })
                    var ret = await promise
                    return ret
                    }
                    ,
                    end: null
                }




            }

}
