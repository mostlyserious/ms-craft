export default {
    inserted: (el, { value: register }, vnode) => {
        register({ el, component: vnode.componentInstance });
    },
};
