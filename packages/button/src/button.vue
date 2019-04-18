<template>
	<button
		class="vui-button"
		@click="handleClick"
		:disabled="buttonDisabled || loading"
		:autofocus="autofocus"
		:type="nativeType"
		:class="[
          type ? 'vui-button--' + type : '',
          {
            'is-disabled': buttonDisabled,
            'is-loading': loading,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle
          },
          className
        ]"
	>
		<div class="vui-loading-box">
			<div class="lds-spinner small" v-if="loading">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<!--<i class="vui-icon-loading" v-if="loading">-->
				<!--<div class="m-load2">-->
					<!--<div class="line">-->
						<!--<div></div>-->
						<!--<div></div>-->
						<!--<div></div>-->
						<!--<div></div>-->
						<!--<div></div>-->
						<!--<div></div>-->
					<!--</div>-->
					<!--<div class="circlebg"></div>-->
				<!--</div>-->
			<!--</i>-->
			<i :class="icon" v-if="icon && !loading"></i>
			<span v-if="$slots.default"><slot></slot></span>
		</div>
	</button>
</template>

<script>
  export default {
    name: 'VuiButton',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      icon: {
        type: String,
        default: ''
      },
      nativeType: {
        type: String,
        default: 'button'
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean,
      className: String
    },
    computed: {
      buttonDisabled() {
        return this.disabled;
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>

<style scoped>

</style>




