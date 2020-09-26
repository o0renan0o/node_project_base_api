module.exports = async (req, res) => {
    res.cookie('toolToken', "");
    res.status(200).render('index', {
        error: "Logout",
        server: process.env.LOCALSERVER
    });
};
