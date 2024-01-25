async function sql( args ) {
/*
description("This will execute sql on the internal SQLite database")
base_component_id("systemFunctionAppSql")
hash_algorithm("SHA256")
load_once_from_file(true)
only_run_on_server(true)
*/


    var getSqlResults = new Promise(returnResult => {
        var dbPath = path.join(userData, 'app_dbs/' + args.base_component_id + '.visi')
        //console.log("dbPath: " + JSON.stringify(dbPath,null,2))
        var appDb = new sqlite3.Database(dbPath);

        appDb.serialize(
            function() {
                appDb.run("begin exclusive transaction");
                appDb.all(
                    args.sql
                    ,
                    args.params
                    ,

                    function(err, results)
                    {
                    //console.log("Results: " + JSON.stringify(results,null,2))
                        appDb.run("commit");
                        returnResult(results)
                    })
         })
    })


    var res = await getSqlResults
    return res


}
