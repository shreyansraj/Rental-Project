module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash("error", "You must logged in to add listing");
        return res.redirect("/login");
    }
    next();
}