
export const generateTokan = (user, message, statusCode, res) =>{
    const tokan = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminTokan" : "patientTokan"
    res.status(statusCode).cookie(cookieName, tokan, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }).json({
        success : true,
        message,
        user,
        tokan,
    })
}