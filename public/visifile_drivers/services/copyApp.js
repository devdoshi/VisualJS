async function copyAppshareApp(args) {
/*
description("copyAppshareApp function")
base_component_id("copyApp")
load_once_from_file(true)
only_run_on_server(true)
*/
    let userId = args.user_id

    async function asdf(argsBaseComponentId, newBaseid, parentHashId, code, returnfn, newDisplayName) {
        dbsearch.all(
            "SELECT    child_component_id    FROM    component_usage    where    base_component_id = ? ;  "
            ,
            argsBaseComponentId
            ,

            async function(err, listOfSubComponentsRes)
            {
                var listOfSubComponents = []
                for (var yuy = 0; yuy < listOfSubComponentsRes.length ; yuy++ ) {

                    listOfSubComponents.push( listOfSubComponentsRes[yuy].child_component_id )

                }
                console.log("****copyAppshareApp userId: " + userId)
                await saveCodeV2( newBaseid, parentHashId, code ,
                            {
                                sub_components:         listOfSubComponents,
                                copy_db_from:           argsBaseComponentId,
                                save_html:              true,
                                //let userid = await getUserId(req)
                                //let optionsForSave = req.body.value.options
                                userId: userId
                            })

                returnfn({
                            new_display_name:   newDisplayName,
                            base_component_id:  newBaseid
                            })


            })
    }





    var promise = new Promise(async function(returnfn) {

        var argsBaseComponentId = args.base_component_id
        var argsNewAppId        = args.new_app_id

        dbsearch.serialize(
            async function() {
                dbsearch.all(
                    "SELECT    id, code, display_name    FROM    system_code    where    " +
                        " base_component_id = ? and code_tag = 'LATEST';  "
                    ,
                    argsBaseComponentId
                    ,

                    async function(err, results)
                    {
                        if (results.length > 0) {
                            var code = results[0].code
                            if (code) {
                                code = code.toString()
                            }
                            var newBaseid = argsBaseComponentId + "_" + uuidv1().replace(/\-/g, '');
                            if (argsNewAppId) {
                                newBaseid = argsNewAppId
                            }

                            var oldDisplayName = results[0].display_name
                            var parentHashId = results[0].id
                            var newDisplayName = "Copy of " + oldDisplayName
                            code = saveHelper.deleteCodeString(code, "load_once_from_file")
                            code = saveHelper.deleteCodeString(code, "read_only")
                            code = saveHelper.deleteCodeString(code, "visibility")

                            var componentTypeV2 = saveHelper.getValueOfCodeString(code, "component_type_v2")
                            if (componentTypeV2) {
                                code = saveHelper.deleteCodeString(code, "component_type_v2")
                            }
                            code = saveHelper.insertCodeString(code, "component_type_v2", "APP")


                            var formEditor = saveHelper.getValueOfCodeString(code, "formEditor",")//formEditor")
                            if (formEditor) {
                                formEditor.id = newBaseid
                                code = saveHelper.deleteCodeString(code, "formEditor",")//formEditor")
                                code = saveHelper.insertCodeString(code, "formEditor", formEditor,")//formEditor")

                                code = saveHelper.deleteCodeString(code, "display_name")
                                code = saveHelper.insertCodeString(code, "display_name", newDisplayName)
                            }
                            code = saveHelper.insertCodeString(code, "visibility", "PRIVATE")


                            //hack city - Vue and component strings are separated as otherwise they mark the
                            // code as UI code
                            var vueIndex = code.indexOf("Vue" + ".component")
                            if (vueIndex != -1) {
                                var vueIndexEnd = code.substring(vueIndex).indexOf(",")
                                if (vueIndexEnd) {
                                    code = code.substring(0,vueIndex + 14) + "'" + newBaseid + "'" + code.substring(vueIndex + vueIndexEnd )
                                }
                            }

                            //zzz
                            await asdf(argsBaseComponentId, newBaseid, parentHashId, code, returnfn,newDisplayName)


                        }


                    })
        }, sqlite3.OPEN_READONLY)

    })
    var ret = await promise


    return ret
}
