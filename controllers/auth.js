const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.register = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  if (name === "" || email === "" || password === "" || passwordConfirm === "") {
    return res.render("register", {
      message: "input fields are empty."
    });
  }

  if (password.length < 8) {
    return res.render("register", {
      message:"Password should be at least of 8 characters."
    })
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (result.length > 0) {
        return res.render("register", {
          message: "This email is alreay in use",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not match",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);

      db.query(
        "INSERT INTO users(name,email,password) VALUES(?,?,?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.log("there was an error inserting the data ", err);
          } else {
            return res.render("register", {
              message: "User registered",
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).render("login", {
        message: "Please provide email and password",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (
          result == "" ||
          !(await bcrypt.compare(password, result[0].password))
        ) {
          res.status(401).render("login", {
            message: "Incorrect email or password",
          });
        } else {
          const id = result[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECERT, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };
          console.log(`${result[0].name} logged in to website`);
          res.cookie("jwt", token, cookieOptions);
          res.status(200).redirect("/");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECERT
      );
      //from isloogedin //  { id: 1, iat: 1714454521, exp: 1722230521 }
      db.query(
        "SELECT * FROM users WHERE id = ?",
        [decoded.id],
        (err, result) => {
          // console.log(result);
          if (!result) {
            return next();
          }
          req.user = result[0];
          return next();
        }
      );
    } catch (err) {
      console.log("error from isLoggedIn: ", err);
      return next();
    }
  } else {
    next();
  }
};


exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true
  });
  res.status(200).redirect("/");
}