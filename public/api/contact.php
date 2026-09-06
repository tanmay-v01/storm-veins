<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Email is required"]);
    exit;
}

$name = htmlspecialchars($data['name'] ?? 'Prospective Client');
$sender_email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$org = htmlspecialchars($data['org'] ?? 'Not specified');
$service = htmlspecialchars($data['service'] ?? 'Commercial Growth Engines');
$budget = htmlspecialchars($data['budget'] ?? 'Not specified');
$message = htmlspecialchars($data['message'] ?? 'No message provided');

$to_partner = "contact@stormveins.com";
$bcc = "tanmayv86@gmail.com";
$from = "Storm Veins Media House <contact@stormveins.com>";

// 1. Notification to Founding Partners
$subject_partner = "New Executive Brief: " . $name . " (" . $org . ")";
$body_partner = "NEW EXECUTIVE INQUIRY RECEIVED\n\n" .
                "Client Name: " . $name . "\n" .
                "Corporate Email: " . $sender_email . "\n" .
                "Organization: " . $org . "\n" .
                "Target Mandate: " . $service . "\n" .
                "Indicative Budget: " . $budget . "\n\n" .
                "Client Message:\n" . $message . "\n";

$headers_partner = "From: " . $from . "\r\n" .
                   "Reply-To: " . $sender_email . "\r\n" .
                   "Bcc: " . $bcc . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();

mail($to_partner, $subject_partner, $body_partner, $headers_partner);

// 2. Auto-Confirmation to Client
$subject_client = "Brief Received: Storm Veins Media House";
$body_client = "Dear " . $name . ",\n\n" .
               "Thank you for initiating an executive inquiry with Storm Veins Media House.\n\n" .
               "Your brief regarding \"" . $service . "\" has been routed directly to our Founding Partners. We review every mandate within 12 business hours.\n\n" .
               "Summary of submitted brief:\n" .
               "- Client Name: " . $name . "\n" .
               "- Organization: " . $org . "\n" .
               "- Target Engagement: " . $service . "\n\n" .
               "If you have additional technical specifications or proprietary briefing decks to share, you may reply directly to this email under mutual non-disclosure.\n\n" .
               "Respectfully,\n\n" .
               "Founding Partners\n" .
               "Storm Veins Media House\n" .
               "Systems Architecture & Enterprise Commercial Engineering\n" .
               "Mumbai & Thane, Maharashtra\n" .
               "Direct Line: +91 96998 31323\n" .
               "Email: contact@stormveins.com\n" .
               "Web: stormveins.com\n";

$headers_client = "From: " . $from . "\r\n" .
                  "Reply-To: contact@stormveins.com\r\n" .
                  "X-Mailer: PHP/" . phpversion();

mail($sender_email, $subject_client, $body_client, $headers_client);

echo json_encode(["success" => true]);
?>
