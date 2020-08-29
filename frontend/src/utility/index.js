export default {
  admin: 1,
  user: 2,

  notEmptyRule(value){
    const rules = [];
    const rule1 = v => !!v || `${value} is required`;
    rules.push(rule1);
    return rules;
  },

  equalsRule(name, other){
    const rules = [];
    const rule1 = v => v == other || `${name} does not match`;
    rules.push(rule1)
    return rules;
  },

  doesNotContain(array, name){
    const rules = [];
    const rule1 = v => array.indexOf(v) == -1 || `Value ${v} as ${name} is already taken`;
    rules.push(rule1);
    return rules;
  },

  buttonSize(breakpoint){
    const breakpointToClass = {
      'xs': 'x-small',
      'sm': 'small',
      'lg': 'large',
      'xl': 'x-large'
    };
    const size = breakpointToClass[breakpoint];
    return size ? {[size]: true} : {};
  },

  iconSize(breakpointName){
    switch(breakpointName){
      case 'xs': return 100;
      case 'sm': return 170;
      case 'md': return 240;
      case 'lg': return 310;
      default: return 380; 
    }
  }
}