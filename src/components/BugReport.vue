<template>

<div class="report-bug-container">
    <sl-drawer @sl-hide="$emit('hide')" label="Report a bug" class="report-bug_drawer" ref="drawer">
        <sl-form @sl-submit="submitForm" class="report-bug_form" ref="form">
            <sl-input name="short-description" type="text" 
                label="Give a short description/headline"
                maxlength="90"
                help-text="Keep this short and concise! (90 characters max)"></sl-input>
            <br>
            <sl-select 
                label="On what page does the bug occur?"
                help-text="Does this bug appear on a particular page?"
            >
                <sl-menu-item value="general">No particular page</sl-menu-item>
                <sl-menu-item v-for="route in routes" :key="route" :value="route">{{ route }}</sl-menu-item>
            </sl-select>
            <br>
            <sl-textarea label="Please describe the bug"></sl-textarea>
            <br><br>
            <sl-button submit>Submit</sl-button>
        </sl-form>
    </sl-drawer>
</div>

</template>

<script>
export default {
    name: 'ReportBug',
    props: ['showDrawer'],
    data: function() {
        return {
        }
    },
    watch: {
        showDrawer: function(newVal, oldVal) {
            if (newVal) {
                this.$refs['drawer'].show();
            } else {
                this.$refs['drawer'].hide();
            }  
        }
    },
    computed: {
        routes: function() {
            return this.$router.getRoutes()
                .filter(route => route.name)
                .map(route => route.name = route.name.charAt(0).toUpperCase() + route.name.slice(1));
        }
    },
    methods: {
        submitForm: function(form) {
            console.log(form.formData);
            console.log(this.$refs['form']);
        }
    }
}
</script>

<style lang="scss">
</style>