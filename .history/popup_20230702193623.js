document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const apiKeyInput = document.getElementById("apiKey");
  const nameInput = document.getElementById("name");
  const desiredRoleInput = document.getElementById("desiredRole");
  const yearsExperienceInput = document.getElementById("yearsExperience");
  const degreeInput = document.getElementById("degree");
  const emailInput = document.getElementById("email");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const jobDescription = document.getElementById("jobDescription");
  const coverLetter = document.getElementById("coverLetter");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const loadingBar = document.getElementById("loadingBar");

  // Load saved data from localStorage
  apiKeyInput.value = localStorage.getItem('apiKey') || '';
  nameInput.value = localStorage.getItem('name') || '';
  desiredRoleInput.value = localStorage.getItem('desiredRole') || '';
  yearsExperienceInput.value = localStorage.getItem('yearsExperience') || '';
  degreeInput.value = localStorage.getItem('degree') || '';
  emailInput.value = localStorage.getItem('email') || '';
  phoneNumberInput.value = localStorage.getItem('phoneNumber') || '';
  jobDescription.value = localStorage.getItem('jobDescription') || '';

  let response;

  generateBtn.addEventListener("click", async () => {
    try {
      loading.style.display = "block";
      loadingBar.style.display = "block"; // Show the loading bar
      error.style.display = "none";

      const apiKey = apiKeyInput.value;
      const name = nameInput.value;
      const desiredRole = desiredRoleInput.value;
      const yearsExperience = yearsExperienceInput.value;
      const degree = degreeInput.value;
      const email = emailInput.value;
      const phoneNumber = phoneNumberInput.value;
      const description = jobDescription.value;

      // Save data to localStorage
      localStorage.setItem('apiKey', apiKey);
      localStorage.setItem('name', name);
      localStorage.setItem('desiredRole', desiredRole);
      localStorage.setItem('yearsExperience', yearsExperience);
      localStorage.setItem('degree', degree);
      localStorage.setItem('email', email);
      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('jobDescription', description);

      const messages = [
        {
          'role': 'system',
          'content': 'You are a helpful assistant.'
        },
        {
          'role': 'user',
          'content': `Generate a professional cover letter for a job application based on the following information in about 300 words please:
          Name: ${name}
          Desired Role: ${desiredRole}
          Years of Experience: ${yearsExperience}
          Degree: ${degree}
          Email: ${email}
          Phone Number: ${phoneNumber}

          Job Description:
          ${description}`
        }
      ];

      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          'model': 'gpt-3.5-turbo',
          'messages': messages,
          'max_tokens': 500,
          'n': 1,
          'temperature': 0.5
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid API key");
        } else {
          throw new Error(`Error generating cover letter (status: ${response.status}, statusText: ${response.statusText})`);
        }
      }

      const data = await response.json();
      const generatedText = data['choices'][0]['message']['content'];
      coverLetter.value = generatedText;

      // Animate the loading bar
      let width = 1;
      const animate = setInterval(() => {
        if (width >= 100) {
          clearInterval(animate);
        } else {
          width++;
          progress.style.width = width + '%';
        }
      }, 100);

    } catch (e) {
      clearInterval(animate); // Stop animating the loading bar if an error occurs
      console.error(e);

      if (e.message === "Invalid API key") {
        error.innerText = "Error generating cover letter. Invalid API key. Please check your API key and try again.";
      } else if (e.message === "Error generating cover letter") {
        error.innerText = `Error generating cover letter (status: ${response && response.status}, statusText: ${response && response.statusText}). Please check your API key and try again.`;
      } else {
        error.innerText = "An unexpected error occurred. Please try again.";
      }
      error.style.display = "block";
    } finally {
      loading.style.display = "none";
      loadingBar.style.display = "none"; // Hide the loading bar
      progress.style.width = '1%'; // Reset the loading bar
    }
  });
});
