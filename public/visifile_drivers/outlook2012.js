{
    name: 'outlook2012'
    ,
    version: 1
    ,
    vue: {
            template:   '<div>'+
						'     <table class="table table-striped table-bordered " style="width: 100%;">'+
						'        <tbody>'+
						'          <tr scope="row"><td>Type</td><td>outlook2012</td></tr>'+
						'          <tr scope="row"><td>ID</td><td>{{get_connection_property(connection_name,"id")}}</td></tr>'+
						'          <tr scope="row"><td>Status</td><td>{{get_connection_property(connection_name,"status")}}</td></tr>'+
						'          <tr scope="row"><td>Database</td><td>{{get_connection_property(connection_name,"database")}}</td></tr>'+
						'          <tr scope="row"><td>Host</td><td>{{get_connection_property(connection_name,"host")}}</td></tr>'+
						'          <tr scope="row"><td>Port</td><td>{{get_connection_property(connection_name,"port")}}</td></tr>'+
						'          <tr scope="row"><td>Username</td><td>{{get_connection_property(connection_name,"user")}}</td></tr>'+
						'          <tr scope="row"><td>Password</td><td>*****************</td></tr>'+
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
				  this.$store.dispatch('add_connection', {cn: this.connection_name, cp: {id: this.connection_name, base_component_id: this.connection_driver}})
				  this.$store.dispatch('hide_add_connection')
				},
				Cancel: function() {
				  this.$store.dispatch('hide_add_connection')
				}
			  }
			}
    ,
    vue_add: {
            template:   '    <div>' +
'        <div class="input-group">' +
'' +
 '' +
'' +
 '       <div class="form-group">' +
  '        <label for="ID" class=" col-form-label">Connection name</label>' +
   '       <input  type="text" class="form-control" v-model="connection_name" />' +
    '    </div>' +
'' +
 '       <div class="form-group">' +
  '          <label for="Status" class=" col-form-label">Status</label>' +
   '         <div class="form-text text-muted">' +
    '        Unknown' +
     '       </div>' +
      '  </div>' +
'' +
 '       <div class="form-group">' +
  '          <label for="Database" class="col-form-label">Database name</label>' +
   '         <input  type="text" class="form-control" v-model="database" />' +
    '    </div>' +
'' +
 '       <div class="form-group">' +
  '          <label for="Host" class="col-form-label">Host</label>' +
   '         <input  type="text" class="form-control" v-model="host" />' +
    '    </div>' +
'' +
 '       <div class="form-group">' +
  '          <label for="Port" class=" col-form-label">Port</label>' +
   '         <input  type="text" class="form-control" v-model="port" />' +
    '    </div>' +
'' +
 '       <div class="form-group">' +
  '          <label for="Username" class="col-form-label">User name</label>' +
   '         <input  type="text" class="form-control" v-model="connection_username" />' +
    '    </div>' +
'' +
 '       <div class="form-group ">' +
  '          <label for="Password" class=" col-form-label">Password</label>' +
   '         <input  class="form-control" type=password v-model="connection_password" />' +
    '    </div>' +
'' +
 '       <div class="form-group row">' +
  '            <span class="input-group-btn">' +
   '             <button class="btn btn-secondary" type="button" v-on:click="OK">OK</button>' +
    '            <button class="btn btn-secondary" type="button" v-on:click="Cancel">Cancel</button>' +
     '         </span>' +
      '      </div>' +
       ' </div>' +
'' +
 '     </div>' +
  '  </div>'


			,
			name: 'outlook2012-add-connection'
			,
			  props: []
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
				  this.$store.dispatch('add_new_connection',
				  {
					  cn: this.connection_name,
					  cp: {
						  name:      this.connection_name,
						  base_component_id:    'outlook2012',
						  database:  this.database,
						  host:      this.host,
						  port:      this.port,
						  user:      this.connection_username,
						  password:  this.connection_password
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
				  connection_name:           "outlook2012",
				  connection_connect_string: null,
				  database:                  "outlook2012",
				  host:                      "127.0.0.1",
				  port:                      "5432",
				  connection_status:         null,
				  connection_username:       "outlook2012",
				  connection_password:       "manager"
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
						'        <div class="form-group">' +
						'            <label for="SQL" class="col-form-label">SQL</label>' +
						'            <input  type="text" class="form-control" v-model="sql"  />' +
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
			name: 'outlook2012-add-query'
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
					//alert(JSON.stringify({sql: this.sql} , null, 2));
				  this.$store.dispatch('add_new_query',
					  {
						  name:           this.query_name,
						  connection:     this.query_connection,
						  base_component_id:        'outlook2012',
						  type:          '|DATABASE|',
						  definition:    JSON.stringify({sql: this.sql} , null, 2),
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
				  query_name:                "outlook2012 query",
				  sql:                       "SELECT * FROM ojobs_users limit 2"
				};
			  }
	}

    ,
    vue_view_query: {
            template:   '<div>'+
						'     <table class="table table-striped table-bordered " style="width: 100%;">'+
						'        <tbody>'+
						'          <tr scope="row"><td>ID</td><td>{{get_query_property(query_name,"id")}}</td></tr>'+
						'          <tr scope="row"><td>base_component_id</td><td>outlook2012</td></tr>'+
						'          <tr scope="row"><td>SQL</td><td>{{get_query_property(query_name,"definition")}}</td></tr>'+
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
    setup: function(connection, callfn) {

          connection.status = 'connected';
      },


    get_v2: function( connection , parameters , callfn )
    {


			dbsearch.serialize(
				function() {
					var stmt = dbsearch.all(
						"SELECT  distinct contents.content  FROM data_states, connections, contents where data_states.connection = " +
						"? and contents.id = data_states.hash" ,
						connection.id
						,
						function(err, results)
						{
							if (!err)
							{
								if( results.length != 0)
								{
									var rows = []
									rows.push({value: "Email subject" });
									rows.push({value: JSON.stringify(connection,null,2) });
									rows.push({value: JSON.stringify(parameters,null,2) });
									rows.push({value: JSON.stringify(results[0],null,2)})
									callfn(rows);
								} else {
									callfn([{value: "no sql" }]);
								}
							} else {
								callfn([{value: "Error: " + err }]);
						   }
						})
		}, sqlite3.OPEN_READONLY)


    }
}
