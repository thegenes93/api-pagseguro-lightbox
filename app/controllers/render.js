"use strict";
module.exports = app => {
 
    const index = async (req, res) => {
        return res.render("index");
    }

    return { index }
}