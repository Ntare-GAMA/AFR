import java.sql.*;
import java.util.Scanner;

public class AgroConnectBackend {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/shira";
    private static final String USER = "root";
    private static final String PASS = "yourpassword";

    public static void main(String[] args) {
        try (Connection conn = DriverManager.getConnection(DB_URL, USER, PASS)) {
            System.out.println("Connected to database successfully.");
            Scanner scanner = new Scanner(System.in);

            System.out.println("Are you a Farmer or Investor? (F/I): ");
            String role = scanner.nextLine();

            System.out.print("Enter your name: ");
            String name = scanner.nextLine();

            System.out.print("Enter your email: ");
            String email = scanner.nextLine();

            if (role.equalsIgnoreCase("F")) {
                registerFarmer(conn, name, email);
            } else if (role.equalsIgnoreCase("I")) {
                registerInvestor(conn, name, email);
            } else {
                System.out.println("Invalid role selected.");
            }

            scanner.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void registerFarmer(Connection conn, String name, String email) throws SQLException {
        String sql = "INSERT INTO farmers (name, email) VALUES (?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.executeUpdate();
            System.out.println("Farmer registered successfully.");
        }
    }

    private static void registerInvestor(Connection conn, String name, String email) throws SQLException {
        String sql = "INSERT INTO investors (name, email) VALUES (?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.executeUpdate();
            System.out.println("Investor registered successfully.");
        }
    }
}
