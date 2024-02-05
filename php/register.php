<!?php
// remove the "!" before the php tags, if you want to run the script

$jsonFilePath = 'user_database.json';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmPassword"];

    
    if ($password !== $confirmPassword) {
        echo 'Passwords do not match';
        return;
    }

    $existingData = file_get_contents($jsonFilePath);
    $existingDataArray = json_decode($existingData, true);


    foreach ($existingDataArray as $user) {
        if ($user['email'] === $email) {
            echo 'Email already exists. Please choose a different email.';
            return;
        }
    }
    
    $passwordToSave = hash('sha256', $password);
    $userData = [
            'username' => $username,
            'email' => $email,
            'password' => $passwordToSave, 
        ];


    $existingDataArray[] = $userData;


    $jsonData = json_encode($existingDataArray, JSON_PRETTY_PRINT);

    
    file_put_contents($jsonFilePath, $jsonData);

    echo 'Registration successful!';
}
?!>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
        }

        label {
            display: block;
            margin-bottom: 8px;
        }

        input {
            width: 100%;
            padding: 8px;
            margin-bottom: 16px;
            box-sizing: border-box;
        }

        button {
            background-color: green;
            color: green;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>



<form action="/php/register.php" method="post">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>

    <label for="confirmPassword">Confirm Password:</label>
    <input type="password" id="confirmPassword" name="confirmPassword" required>

    <button type="submit">Register</button>
</form>

</body>


</html>
