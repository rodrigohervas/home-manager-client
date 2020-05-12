/**
 * Function to toggle div display property
 * 
 * @param {String} id 
 */
export const showHide = (id) => {
    const div = document.getElementById(id);
    div.style.display = (div.style.display === 'block') ? 'none' : 'block';
}

//enum listing all months of the year for Dashboard component
export const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/**
 * Returns the month name for the month number passed in monthNumber
 * @param {string} monthNumber 
 */
export const getMonthName = (monthNumber) => {
    return Months[monthNumber - 1]
}

/**
 * function that formats an string for proper format:
 *  a. to render it in an input type date (forInput = true)
 *  b. to send it to the server (forInput = false)
 * @param {string} date 
 * @param {boolean} forInput 
 */
export const formatDate = (date, forInput) => {
    const newDate = new Date(date + " 00:00:00")
    
    const year = (newDate.getFullYear()).toString()
    
    const month = newDate.getMonth() + 1
    const strMonth = month < 10 ? '0' + month.toString() : month.toString()
    
    const day = newDate.getDate()
    const strDay = day < 10 ? '0' + day.toString() : day.toString()
    
    return forInput ? `${year}-${strMonth}-${strDay}` : `${strMonth}/${strDay}/${year}`
}
