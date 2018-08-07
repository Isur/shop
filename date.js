module.exports = Object.freeze({
    localTimeString: new Date().toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }),
    localDateString: new Date().toLocaleDateString(undefined, {  
        day : 'numeric',
        month : 'short',
        year : 'numeric'
    })
})