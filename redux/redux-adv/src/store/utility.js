export const updateObject=(oldObject,updatedValues)=>{
    return {
        ...oldObject,
        ...updatedValues, //expect an object
    };
};


