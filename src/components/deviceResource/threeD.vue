<template>
    <div id="cesiumContainer">
        <div style="display: none" id="credit"></div>
    </div>
</template>
<script>
import * as Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";
export default {
    name: "threeD",
    mounted() {
        this.$nextTick(() => {
            Cesium.Ion.defaultAccessToken =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1NWI5MGUzNi1mYWI3LTQzY2QtOGI0Ni0xZWYyNTAxNGM4N2MiLCJpZCI6MTI1OTgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjE0NDkyNTV9.hBH0PGSnKErc_yNhIePASUkr3QPDoo0KDX9uLpNBUns";
            const viewer = new Cesium.Viewer("cesiumContainer", {
                geocoder: false,
                homeButton: false,
                navigationHelpButton: false,
                animation: false,
                creditContainer: "credit",
                timeline: false,
                fullscreenButton: false,
                vrButton: false,
            });
        });
    },
};
</script>
<style scoped lang="less">
#cesiumContainer {
    width: 1276px;
    height: 568px;
    overflow: hidden;
}
</style>