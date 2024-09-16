import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMASLXxOGq5rCMmufcdIYQhvO_CDXtAG8",
    authDomain: "sustainable-energy-fea19.firebaseapp.com",
    projectId: "sustainable-energy-fea19",
    storageBucket: "sustainable-energy-fea19.appspot.com",
    messagingSenderId: "89672886526", 
    appId: "1:89672886526:web:4b902e6c4e9ee94b83ddaf"
  
};

const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// Handle Sign Up
document.getElementById("submitSignUp").addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("rEmail").value;
  const password = document.getElementById("rPassword").value;
  const name = document.getElementById("name").value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userData = {
        email: email,
        name: name,
      };

      // Save user data in Firestore
      const docRef = doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          showMessage("Account Created Successfully", "signUpMessage");
          localStorage.setItem("userName", name);
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("Error writing document", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showMessage("Email Address Already Exists !!!", "signUpMessage");
      } else {
        showMessage("Unable to create user", "signUpMessage");
      }
    });
});

// Handle Sign In
document.getElementById("submitSignIn").addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const db = getFirestore();

      // Fetch user data from Firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const name = userData.name;
        localStorage.setItem("userName", name);
        showMessage("Login successful", "signInMessage");
        window.location.href = "index1.html";
      } else {
        showMessage("User data not found", "signInMessage");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        showMessage("Incorrect Email or Password", "signInMessage");
      } else {
        showMessage("Account does not Exist", "signInMessage");
      }
    });
});

// Handle Logout
document.getElementById("logoutButton").addEventListener("click", () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    localStorage.removeItem("loggedInUserId");
    localStorage.removeItem("userName");
    location.reload();
  });
});
