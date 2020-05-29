/**
 * Function to toggle div display property
 * 
 * @param {String} id 
 */
export const showHide = (id) => {
    const div = document.getElementById(id);
    div.style.display = (div.style.display === 'flex') ? 'none' : 'flex';
}


/**
 * Function that:
 * 1. manages showing the nav as dropdown
 * 2. manages rotating back the hamburger
 */
export const closeMenu = () => {

    // if nav has class showMenu, width is small, 
    // and nav should be shown as dropdown. 
    // Else, don't do anything
    const nav = document.querySelector('.menu');
    if(nav.classList[1] === 'showMenu') {
        /* hide menu on click */
        nav.classList.toggle('showMenu');

        /* rotate back hamburger */
        const element = document.querySelector('.hamburger');
        element.classList.toggle('change');
    }
};

/**
 * Modifies the animation.animation-name
 * @param {Event} e 
 */
export const rotateChevron = (e) => {
    if ( e.target.style.animationName === '') {
        e.target.style.animationName = 'rotate-down';
    }
    else if ( e.target.style.animationName === 'rotate-down') {
        e.target.style.animationName = 'rotate-up';
    }
    else if ( e.target.style.animationName === 'rotate-up') {
        e.target.style.animationName = 'rotate-down';
    }
}

//enum listing all months of the year for Dashboard component
export const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Returns the month name for the month number passed in monthNumber
 * @param {string} monthNumber 
 */
export const getMonthName = (monthNumber) => {
    return Months[monthNumber - 1];
}

/**
 * function that formats an string for proper format:
 *  a. to render it in an input type date (forInput = true)
 *  b. to send it to the server (forInput = false)
 * @param {string} date 
 * @param {boolean} forInput 
 */
export const formatDate = (date, forInput) => {
    const newDate = new Date(date + " 00:00:00");
    
    const year = (newDate.getFullYear()).toString();
    
    const month = newDate.getMonth() + 1;
    const strMonth = month < 10 ? '0' + month.toString() : month.toString();
    
    const day = newDate.getDate();
    const strDay = day < 10 ? '0' + day.toString() : day.toString();
    
    return forInput ? `${year}-${strMonth}-${strDay}` : `${strMonth}/${strDay}/${year}`;
}

/**
 * Function to format an amount with no decimals adding 2 decimals
 * @param {String} number 
 */
export const formatAmount = (amount) => {
    return parseFloat(amount).toFixed(2);
};


/**
 * Function to take a telephone string 1234567890 and convert it to (123) 456-7890
 * @param {string} telephone 
 */
export const beautifyTelephone = (telephone) => {
    if(telephone) {
        const prefix = telephone.slice(0,3);
        const areaCode = telephone.slice(3,6);
        const number = telephone.slice(-4);
        return `(${prefix}) ${areaCode}-${number}`;
    }
    return '(000) 000-0000';
};

/**
 * Function to take a telephone string with any symbol and convert it to a plain number string 1234567890
 * @param {string} telephone 
 */
export const simplifyTelephone = (telephone) => {
    if(telephone) {
        const regex = /[0-9]/g;
        const numbers = telephone.match(regex);
        const simpleTelephone = numbers.join('');
        return simpleTelephone;
    }
    return '0000000000';
};