const getEmalValidate = (value) => {
    const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return format.test(value);
};

const getPasswordValidate = (value) => {
    const format = /^(?=[a-zA-Z0-9!@$%^*#])(?!.*[^a-zA-Z0-9!@$%^*#]).{6,15}$/;
    return format.test(value);
};

const getNameValidate = (value) => {
    const format = /^[가-힣a-zA-Z]{2,20}$/;
    return format.test(value);
};

export default { getEmalValidate, getPasswordValidate, getNameValidate };
