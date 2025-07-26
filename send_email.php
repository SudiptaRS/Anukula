<?php
header('Content-Type: application/json'); // Set header for JSON response

$response = ['success' => false, 'message' => 'An unknown error occurred.'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    // Validate inputs
    if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Please fill in all required fields correctly.';
        echo json_encode($response);
        exit;
    }

    // Set recipient email address
    $to = "aruha.upajojana.kendra@gmail.com";

    // Prepare email subject
    $email_subject = "Website Contact Form: " . (!empty($subject) ? $subject : "No Subject");

    // Prepare email content
    $email_body = "You have received a new message from your website contact form.\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Subject: " . (!empty($subject) ? $subject : "N/A") . "\n";
    $email_body .= "Message:\n" . $message . "\n";

    // Set email headers
    $headers = "From: " . $name . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Attempt to send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        $response['success'] = true;
        $response['message'] = 'Thank you! Your message has been sent successfully.';
    } else {
        $response['message'] = 'There was an error sending your message. Please try again later.';
        // Log the error for debugging (this won't be visible to the user)
        error_log("Email failed to send from form. To: $to, Subject: $email_subject");
    }

} else {
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);
?>