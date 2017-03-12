import Vue from 'vue'
import Vuex from 'vuex'
import db                       from '../public/dbhelper.js'

Vue.use(Vuex)



export default new Vuex.Store({


  state: {
    add_connection_visible: false
    ,
    list_of_connections: []
    ,
    viewed_connection_id: null
    ,
    viewed_connection_driver: null
    ,
    central_server_client_connected: false
    ,
    central_server_client_internal_ip_address: ""
    ,
    central_server_client_internal_port: -1
    ,
    central_server_client_public_ip_address: ""
    ,
    central_server_client_public_port: -1
  },



  getters: {
    add_connection_visible: state => state.add_connection_visible
    ,
    list_of_connections: state => state.list_of_connections
    ,
    viewed_connection_id: state => state.viewed_connection_id
    ,
    viewed_connection_driver: state => state.viewed_connection_driver
    ,
    central_server_client_connected: state => state.central_server_client_connected
    ,
    central_server_client_internal_ip_address: state => state.central_server_client_internal_ip_address
    ,
    central_server_client_internal_port: state => state.central_server_client_internal_port
    ,
    central_server_client_public_ip_address: state => state.central_server_client_public_ip_address
    ,
    central_server_client_public_port: state => state.central_server_client_public_port

  },







  //-------------------------------------------------------------------
  //                           CHANGE THE STATE
  //
  // This contains the things that change the Vue.js VUEX applicaiton
  // state
  //
  //
  //
  //
  //-------------------------------------------------------------------
  mutations: {
      ADD_CONNECTION: function (state, connection) {
        state.list_of_connections.push(connection.cp);
      },
      CLEAR_CONNECTIONS: function (state) {
        state.list_of_connections = [];
      },
    HIDE_ADD_CONNECTION: function (state) {
      state.add_connection_visible = false
    },
    SET_VIEWED_CONNECTION: function (state, connection) {
      if (connection) {
        state.viewed_connection_id   = connection.id;
        state.viewed_connection_driver = connection.driver;
      } else {
        state.viewed_connection_id   = null;
        state.viewed_connection_driver = null;
      }
    },
    SHOW_ADD_CONNECTION: function (state) {
      state.add_connection_visible = true
    }
  },









  //-------------------------------------------------------------------
  //                     PERFORM ACTIONS IN THE APPLICATION
  //
  // This contains the things that change the whole applicaiton
  //
  //
  // This can change both the Vue.js state and external things, like
  // HTTP requests, database code, etc
  //
  //-------------------------------------------------------------------
  actions: {

    //
    // add_connection
    //
    //
    //
    add_connection: function(a, connection){
      a.commit('ADD_CONNECTION', connection)
      //console.log(JSON.stringify(connection.cp));
      //gun.get('connections').path('user_data').put(connections['user_data']);

    },



    //
    // add_new_connection
    //
    //
    //
    add_new_connection: function(a, connection){
      //a.commit('ADD_NEW_CONNECTION', connection)
      console.log(JSON.stringify(connection));
      //gun.get('connections').path(connection.cp.id).put(connection.cp);
      db.sql(`insert into
                  db_connections
                  (
                      id
                      ,
                      name
                      ,
                      driver
                      ,
                      database
                      ,
                      host
                      ,
                      port
                      ,
                      connectString
                      ,
                      user
                      ,
                      password
                  )
              values
                  (?,?,?,?,?,?,?,?,?)`
                  ,
                  [
                        autoIndexSerialId()
                        ,
                        connection.cn
                        ,
                        connection.cp.driver
                        ,
                        (connection.cp.database?connection.cp.database:null)
                        ,
                        (connection.cp.host?connection.cp.host:null)
                        ,
                        (connection.cp.port?connection.cp.port:null)
                        ,
                        (connection.cp.connectString?connection.cp.connectString:null)
                        ,
                        connection.cp.user
                        ,
                        connection.cp.password
                  ]
            )
    },


    //
    // clear_connections
    //
    //
    //
    clear_connections: function(a){
      a.commit('CLEAR_CONNECTIONS')
    }
    ,





    //
    // delete_connection
    //
    //
    //
    delete_connection: function(a, connection){
      //a.commit('ADD_NEW_CONNECTION', connection)
      //console.log(JSON.stringify(connection.cp));
      connection.deleted = true;
      //gun.get('connections').path(connection.id).put(connection,
      //function() {gun.get('default').path('connections_changed').val(function(v){
      //      gun.get('default').path('connections_changed').put({value: v.value + 1});
      //},true);});
      //alert(connection.id);
      console.log('Delete connection: ' + connection.id)
      db.sql("update db_connections set deleted = 'T' where name = '" + connection.id + "'")
    },





    //
    // hide_add_connection
    //
    //
    //
    hide_add_connection: function(a){
      a.commit('HIDE_ADD_CONNECTION')
    },








    //
    // set_viewed_connection
    //
    //
    //
    set_viewed_connection: function(a, b){
      a.commit('SET_VIEWED_CONNECTION', b)
    },








    //
    // show_add_connection
    //
    //
    //
    show_add_connection: function(a){
      a.commit('SHOW_ADD_CONNECTION')
    }


  }
})
