// If there's an error sent out by an engineer somewhere in the code, this wrapper function will detect it and immediately send the error to the global error handler where it will be handled like a normal error
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}