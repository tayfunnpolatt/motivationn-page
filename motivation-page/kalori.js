document.addEventListener("DOMContentLoaded", function() {
    const calorieForm = document.getElementById("kaloriFormu"); 
    const calorieResult = document.getElementById("kaloriSonucu"); 

    calorieForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const age = parseFloat(document.getElementById("yas").value); 
        const gender = document.getElementById("cinsiyet").value; 
        const weight = parseFloat(document.getElementById("kilo").value); 
        const height = parseFloat(document.getElementById("boy").value); 
        const activityLevel = document.getElementById("aktivite").value; 

        const bmr = calculateBMR(age, gender, weight, height);
        const totalCalories = calculateTotalCalories(bmr, activityLevel);

        displayResult(totalCalories);
    });

    function calculateBMR(age, gender, weight, height) {
        let bmr;
        if (gender === "erkek") { 
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        return bmr;
    }

    function calculateTotalCalories(bmr, activityLevel) {
        let activityFactor;
        switch (activityLevel) {
            case "hareketsiz":
                activityFactor = 1.2;
                break;
            case "hafifEgzersiz":
                activityFactor = 1.375;
                break;
            case "ortaEgzersiz":
                activityFactor = 1.55;
                break;
            case "yoğunEgzersiz":
                activityFactor = 1.725;
                break;
            case "çokYoğunEgzersiz":
                activityFactor = 1.9;
                break;
            default:
                activityFactor = 1.2;
        }
        return Math.round(bmr * activityFactor);
    }

    function displayResult(totalCalories) {
        calorieResult.textContent = `Günlük kalori ihtiyacınız: ${totalCalories} kalori`; 
    }
});
