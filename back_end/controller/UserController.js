import * as yup from "yup"; // Add this if not already imported
import User from "../model/User.js"; // Adjust the import path as necessary
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = yup.object().shape({
  fullname: yup.string().required("Full name is required").trim(),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required").trim(),
  password: yup.string().required("Password is required"),
});

const store = async (req, res) => {
  try {
    // Validate request body
    const validatedData = await userSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true, // Remove unknown fields
    });

    // Create user with validated data
    // Destructure validated data
    const { fullname, username, password } = validatedData;

    // Hash password with proper error handling
    const saltRounds = 10;
    const hashedPassword = await bcrypt
      .hash(password, saltRounds)
      .catch((err) => {
        throw new Error("Password hashing failed");
      });

    // Create and save user with hashed password
    const user = await User.create({
      fullname,
      username,
      password: hashedPassword,
    });

    // Return success response
    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        // Exclude password from response
      },
    });
  } catch (error) {
    // Handle validation errors
    if (error instanceof yup.ValidationError) {
      const errors = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      return res.status(400).json({ success: false, errors });
    }

    // Handle duplicate username
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const login = async (req, res) => {
  try {
    // Validate request body
    let validatedData;
    try {
      validatedData = await loginSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
    } catch (validationError) {
      const errors = validationError.inner.reduce((acc, err) => {
        acc[err.path] = err.message;
        return acc;
      }, {});
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const { username, password } = validatedData;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return success response with token
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export default { store, login };
