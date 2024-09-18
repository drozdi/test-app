.w3-animate-left{
  position:relative;
  animation:animateleft 0.4s
}
@keyframes animateleft{
  from{
    left:-300px;opacity:0
  } 
  to{
    left:0;opacity:1
  }
}

<template>
  <q-layout :view="view" :container="container" :class="[className()]">
    <q-header v-if="isHeader" reveal bordered :class="className('header')">
      <q-bar v-if="$slots.header || isLeft || isRight" class="bg-transparent">
        <q-btn v-if="mini && isLeft" dense flat round icon="menu" @click="onLeftClick" />
        <slot name="header"></slot>
        <q-btn v-if="mini && isRight" dense flat round icon="menu" @click="onRightClick" />
      </q-bar>
      <q-bar v-if="$slots.menu" class="bg-transparent q-px-none">
        <slot name="menu"></slot>
      </q-bar>
    </q-header>
    <q-drawer v-if="isLeft"
        show-if-above bordered side="left"
        v-model="leftOpen"
        @mouseover="leftMini = false"
        @mouseout="leftMini = true"
        :mini-to-overlay="mini"
        :mini="leftMini"
        :width="leftWidth"
        :breakpoint="breakpoint"
        :class="[className('sidebar'), className('sidebar', 'left')]"
        :style="{...mini? {
          'min-width': 0
        }: {}}">
      <div class="row fit">
        <div class="col fit scroll">
          <slot name="left"></slot>
        </div>
        <div v-show="resizable" class="x-layout__res"
             v-touch-pan.horizontal.prevent.mouse.preserveCursor="onLeftResize"></div>
      </div>
    </q-drawer>
    <q-drawer v-if="isRight"
        show-if-above bordered side="right"
        v-model="rightOpen"
        @mouseover="rightMini = false"
        @mouseout="rightMini = true"
        :mini-to-overlay="mini"
        :mini="rightMini"
        :width="rightWidth"
        :breakpoint="breakpoint"
        :class="[className('sidebar'), className('sidebar', 'right')]"
        :style="{...mini?{
          'min-width': 0
        }:{}}">
      <div class="row fit">
        <div v-show="resizable" class="x-layout__res"
             v-touch-pan.horizontal.prevent.mouse.preserveCursor="onRightResize"></div>
        <div class="fit col scroll">
          <slot name="right"></slot>
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <q-page ref="body" class="scroll" :style-fn="pageStyle">
          <slot name="default"></slot>
      </q-page>
    </q-page-container>
    <q-footer v-if="isFooter" reveal bordered :class="className('footer')">
      <q-toolbar class="q-px-none">
        <slot name="footer"></slot>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { inject, ref, computed, onMounted, onBeforeMount, nextTick } from 'vue'
import { useQuasar } from "quasar";

import defLayoutProps from "./default";
import { makeLayoutProps } from "./props";
import { provideLayoutProps } from "../../composables/provide";

import { parentProps } from '../../utils/props'
import { minMax } from '../../utils/fns'
import { getComputedSize, getComputedStyle } from '../../utils/dom';

import { useApp, injectApp } from "../../composables/useApp";
import { useSize, injectSize } from "../../composables/useSize";
import { useClassName } from "../../composables/useClassName";
import { useSetting } from "../../composables/useSetting";

export default {
  name: "x-layout",
  props: {
    ...parentProps(makeLayoutProps, {}, provideLayoutProps),
    container: {
      type: Boolean,
      default: () => inject('layout.container', false)
    }
  },
  emits: ['update:lw', 'update:rw', 'resize'],
  setup (props, { emit }) {
    const $app = injectApp(null)
    const $size = injectSize(useQuasar().screen)
    const $sm = useSetting()
    const { className, queryName } = useClassName()

    function __emit (...args) {
      emit(...args)
      $app?.emit(...args)
    }

    const noProps = ref({
      lw: props.lw,
      rw: props.rw,
      lm: true,
      rm: true,
      ll: false,
      rl: false,
      lo: true,
      ro: true
    })
    const startWidth = ref(0);

    const limits = computed(() => {
      let style = getComputedStyle(queryName('sidebar', 'left'));
      let minLeft = parseInt(style.minWidth || 0, 10) || 0;
      let maxLeft = parseInt(style.maxWidth || 0, 10) || 0;
      style = getComputedStyle(queryName('sidebar', 'right'));
      let minRight = parseInt(style.minWidth || 0, 10) || 0;
      let maxRight = parseInt(style.maxWidth || 0, 10) || 0;

      minLeft = props.minLw? props.minLw: minLeft;
      maxLeft = props.maxLw? props.maxLw: maxLeft;
      minRight = props.minRw? props.minRw: minRight;
      maxRight = props.maxRw? props.maxRw: maxRight;

      return {
        minLeft: !mini.value? minLeft: 0,
        maxLeft: maxLeft,
        minRight: !mini.value? minRight: 0,
        maxRight: maxRight
      };
    })

    const mini = computed(() => {
      return $size.width <= props.miniBreakpoint
    })
    const hideDrawer = computed(() => {
      return $size.width <= props.breakpoint
    })
    const showDrawer = computed(() => {
      return !hideDrawer.value
    })

    const leftWidth = computed({
      get () {
        return noProps.value.lw
      },
      set (value) {
        emit('update:lw', value)
        noProps.value.lw = $sm.set('lw', minMax(value, limits.value.minLeft, limits.value.maxLeft));
      }
    })
    const rightWidth = computed({
      get () {
        return noProps.value.rw
      },
      set (value) {
        emit('update:rw', value)
        noProps.value.lw = $sm.set('lw', minMax(value, limits.value.minLeft, limits.value.maxLeft));
      }
    })
    const leftOpen = computed({
      get () {
        return noProps.value.lo
      },
      set (value) {
        noProps.value.lo = $sm.set('lo', value)
      }
    })
    const rightOpen = computed({
      get () {
        return noProps.value.ro
      },
      set (value) {
        noProps.value.ro = $sm.set('ro', value)
      }
    })
    const leftMini = computed({
      get () {
        return mini.value && showDrawer.value && noProps.value.lm > noProps.value.ll
      },
      set (value) {
        noProps.value.lm = value;
      }
    })
    const rightMini = computed({
      get () {
        return mini.value && showDrawer.value && noProps.value.rm > noProps.value.rl
      },
      set (value) {
        noProps.value.rm = value;
      }
    })

    function onLeftClick () {
      if (hideDrawer.value) {
        leftOpen.value = !leftOpen.value
      } else if (mini.value) {
        noProps.value.ll = $sm.set('ll', !noProps.value.ll)
      } else {
        leftOpen.value = !leftOpen.value
      }
    }
    function onRightClick () {
      if (hideDrawer.value) {
        rightOpen.value = !rightOpen.value
      } else if (mini.value) {
        noProps.value.rl = $sm.set('rl', !noProps.value.rl)
      } else {
        rightOpen.value = !rightOpen.value
      }
    }
    function onLeftResize ({offset, isFirst}) {
      if (isFirst) {
        startWidth.value = leftWidth.value
      } else {
        leftWidth.value = startWidth.value + offset.x
      }
    }
    function onRightResize ({offset, isFirst}) {
      if (isFirst) {
        startWidth.value = rightWidth.value
      } else {
        rightWidth.value = startWidth.value - offset.x
      }
    }

    onBeforeMount(() => {
      /*noProps.value.lw = $sm.get('lw', props.lw)
      noProps.value.rw = $sm.get('rw', props.rw)*/
    })

    onMounted(() => {
      nextTick(() => {
        let [width] = getComputedSize(queryName('sidebar', 'left'));
        leftWidth.value = $sm.get('lw', props.lw || width || 0);
        [width] = getComputedSize(queryName('sidebar', 'right'));
        rightWidth.value = $sm.get('rw', props.rw || width || 0);


        noProps.value.ll = $sm.get('ll', noProps.value.ll)
        noProps.value.rl = $sm.get('rl', noProps.value.rl)
        noProps.value.lo = $sm.get('lo', noProps.value.lo)
        noProps.value.ro = $sm.get('ro', noProps.value.ro)
      })
    })

    function pageStyle (offset, height) {
      return {
        height: (height-offset)+'px'
      }
    }

    return {
      mini, hideDrawer, showDrawer, leftWidth, rightWidth, leftOpen, rightOpen, leftMini, rightMini,
      onLeftClick, onRightClick, onLeftResize, onRightResize, pageStyle, className
    }
  },
}
</script>

<style lang="scss">
@import "../../scss/tools/namespace";
@import "../../scss/tools/color";
@import "../../scss/mixins/base";

@import "../../styles/quasar.variables";


$spacer:                          1rem !default;
$xLayout-font-size:							  1rem !default;
$xLayout-line-height:						  1.15 !default;

$xLayout-header-font-size:				2 * $xLayout-font-size !default;
$xLayout-header-line-height:			1.5 !default;
$xLayout-header-min-height:				1 * $xLayout-header-line-height * $spacer !default;
$xLayout-header-max-height:				4 * $xLayout-header-line-height * $spacer !default;

$xLayout-footer-font-size:				$xLayout-font-size !default;
$xLayout-footer-line-height:			1.5 !default;
$xLayout-footer-min-height:				1 * $xLayout-footer-line-height * $spacer !default;
$xLayout-footer-max-height:				4 * $xLayout-footer-line-height * $spacer !default;

$xLayout-sidebar-width:						200px !default;
$xLayout-sidebar-min-width:				150px !default;
$xLayout-sidebar-max-width:				400px !default;

$xLayout-resizer-width: 					.5rem !default;

@include namespace('@xLayout', true) {
  .q-bar .q-tabs {
    max-width: 100%;
  }
  @include name {
    --x-layout-bg: #fff;
    --x-layout-border: #{$separator-color};
    --x-layout-sidebar-bg: #{$dimmed-background};
    --x-layout-res-bg: #{$dimmed-background};
  }
  .body--dark {
    @include name {
      --x-layout-bg: #{$dark-page};
      --x-layout-border: #{$separator-dark-color};
      --x-layout-sidebar-bg: #{rgba($light-dimmed-background, .1)};
      --x-layout-res-bg: #{$light-dimmed-background};
    }
  }
  @include name(sidebar) {
    min-width: $xLayout-sidebar-min-width;
    max-width: $xLayout-sidebar-max-width;
  }
  @include name(res) {
    width: $xLayout-resizer-width;
    cursor: col-resize;
    background: var(--x-layout-sidebar-bg);
    &:after {
      display: block;
      width: 100%;
      height: 100%;
      content: " ";
      background-image: url('../../assets/images/sidebar-divider-dots.png');
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
  @include name(null, core) {
    background:url('../../assets/images/kosmos-ec26025d6442.jpg') no-repeat fixed left top/cover;
    background-position: top calc(15% - 30px);
    @include name(header) {
      &:before {
        background: url('../../assets/images/kosmos-ec26025d6442.jpg') no-repeat fixed left top/cover;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        content: " ";
        filter: url('../../assets/images/filter.svg#blur');
      }
    }
  }

  @include name (header footer) {
    background-color: var(--x-layout-bg);
  }
}
</style>