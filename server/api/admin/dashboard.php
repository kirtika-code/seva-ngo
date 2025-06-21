<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    // Get total volunteers
    $volunteer_query = "SELECT COUNT(*) as total FROM users WHERE role = 'volunteer'";
    $volunteer_stmt = $db->query($volunteer_query);
    $total_volunteers = $volunteer_stmt->fetch()['total'];

    // Get total donors
    $donor_query = "SELECT COUNT(*) as total FROM users WHERE role = 'donor'";
    $donor_stmt = $db->query($donor_query);
    $total_donors = $donor_stmt->fetch()['total'];

    // Get total active projects
    $project_query = "SELECT COUNT(*) as total FROM projects WHERE status = 'ongoing'";
    $project_stmt = $db->query($project_query);
    $total_projects = $project_stmt->fetch()['total'];

    // Get total upcoming events
    $event_query = "SELECT COUNT(*) as total FROM events WHERE status = 'upcoming'";
    $event_stmt = $db->query($event_query);
    $total_events = $event_stmt->fetch()['total'];

    // Get total donations
    $donation_query = "SELECT SUM(amount) as total FROM donations WHERE status = 'completed'";
    $donation_stmt = $db->query($donation_query);
    $total_donations = $donation_stmt->fetch()['total'] ?? 0;

    // Get donation trends (last 6 months)
    $donation_trend_query = "
        SELECT 
            DATE_FORMAT(donation_date, '%Y-%m') as month,
            SUM(amount) as total
        FROM donations
        WHERE status = 'completed'
        AND donation_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(donation_date, '%Y-%m')
        ORDER BY month ASC
    ";
    $donation_trend_stmt = $db->query($donation_trend_query);
    $donation_trends = $donation_trend_stmt->fetchAll();

    // Get project status distribution
    $project_status_query = "
        SELECT 
            status,
            COUNT(*) as count
        FROM projects
        GROUP BY status
    ";
    $project_status_stmt = $db->query($project_status_query);
    $project_statuses = $project_status_stmt->fetchAll();

    // Get volunteer distribution by skills
    $volunteer_dist_query = "
        SELECT 
            skills,
            COUNT(*) as count
        FROM volunteers
        GROUP BY skills
        LIMIT 5
    ";
    $volunteer_dist_stmt = $db->query($volunteer_dist_query);
    $volunteer_distribution = $volunteer_dist_stmt->fetchAll();

    // Format data for response
    $donation_data = [
        'labels' => array_column($donation_trends, 'month'),
        'values' => array_column($donation_trends, 'total')
    ];

    $project_status_data = [
        'labels' => array_column($project_statuses, 'status'),
        'values' => array_column($project_statuses, 'count')
    ];

    $volunteer_distribution_data = [
        'labels' => array_column($volunteer_distribution, 'skills'),
        'values' => array_column($volunteer_distribution, 'count')
    ];

    // Prepare response
    $response = [
        'stats' => [
            'totalVolunteers' => (int)$total_volunteers,
            'totalDonors' => (int)$total_donors,
            'totalProjects' => (int)$total_projects,
            'totalEvents' => (int)$total_events,
            'totalDonations' => (float)$total_donations
        ],
        'donationData' => $donation_data,
        'projectStatusData' => $project_status_data,
        'volunteerDistributionData' => $volunteer_distribution_data
    ];

    http_response_code(200);
    echo json_encode($response);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Error fetching dashboard data: ' . $e->getMessage()
    ]);
}
?> 