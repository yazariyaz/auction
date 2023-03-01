
export default function validate(name, value, rules = {}) {
    let message = null;
    let strippedName = name.replace(/_/g, " ");

    for(const rule in rules) {
        if((rule === 'nullable') && !value) {
            break;
        }else if((rule === 'required') && !value) {
            message = `${strippedName} is required`;
            break;
        }else if(rule === "minLength"){
            if(value.length < rules[rule]){
                message = `${strippedName} must be more than ${rules[rule]} characters`;
                break;
            }
        }else if(rule === "maxLength"){
            if(value.length > rules[rule]){
                message = `${strippedName} must be more than ${rules[rule]} characters`;
                break;
            }
        }else if(rule === "regex"){
            const reg = new RegExp(rules[rule]);
            if(!reg.test(value)){
                message = `${strippedName} contains invalid characters`;
                break;
            }
        }else if(rule === "numeric"){
            if(isNaN(+value)) {
                message = `${strippedName} must be a number`;
                break;
            }
        }else if(rule === "integer"){
            if(!Number.isInteger(+value)) {
                message = `${strippedName} must be a whole number`;
                break;
            }
        }else if(rule === "in"){
            if(!rules[rule].includes(value)) {
                message = `${strippedName} is invalid`;
                break;
            }
        }else if(rule === "minNumber"){
            if(+value < rules[rule]){
                message = `${strippedName} must be more than ${rules[rule]}`;
                break;
            }
        }else if(rule === "maxNumber"){
            if(+value > rules[rule]){
                message = `${strippedName} must be less than ${rules[rule]}`;
                break;
            }
        }
    }
    return message;
}
