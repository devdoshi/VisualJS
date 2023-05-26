function intro_logo_3d(args) {
/*
created_timestamp(-1)
base_component_id("intro_logo_3d")
is_app(true)
display_name("Intro Logo 3D")
description('Intro logo app, this will return a spinning logo')
uses_javascript_libraries(["advanced_bundle"])
load_once_from_file(true)
*/

    Yazz.component({
      template: `<div id="app2">
          <a-scene style='width: 80%; height: 20%;' embedded vr-mode-ui="enabled: false">

              <a-assets>
                  <a-mixin id="RobotoFont" text="font: /public/aframe_fonts/Roboto-msdf.json"></a-mixin>
                  <a-mixin id="SourceCodeProFont" text="font: /public/aframe_fonts/SourceCodePro.fnt"></a-mixin>
                  <a-mixin id="AileronFont" text="font: /public/aframe_fonts/Aileron-Semibold.fnt"></a-mixin>
              </a-assets>

<a-entity camera look-controls>
    <a-entity geometry="primitive: plane; height: 0.2; width: 0.2" position="1 0 -1"
            material="opacity: 0">
                    <a-box position="2 10 -10" rotation="0 0 0" color="#4CC3D9"  >
                  <a-entity
                       mixin="RobotoFont"
                       position="1 0 .6"
                       text='color: black; align: left; value: Creator ; width: 9; opacity:1;'>
                       </a-entity>
                   <a-animation attribute="position"
											to="2 0 -1.5" dur="2000" direction="normal" ></a-animation>
              </a-box>
               </a-entity>
               </a-entity>
              <a-sky color="#ECECEC"></a-sky>
            </a-scene>
       </div>
      `
    })
}
