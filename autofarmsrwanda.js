import java.sql.*;
import java.util.Scanner;

public class AgroConnectBackend {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/autofarmsrwanda";
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
                System.out.print("Enter your region: ");
                String region = scanner.nextLine();

                System.out.print("Describe your tractor needs: ");
                String tractorNeed = scanner.nextLine();

                registerFarmer(conn, name, email, region, tractorNeed);
            } else if (role.equalsIgnoreCase("I")) {
                System.out.print("Enter your investment focus: ");
                String focus = scanner.nextLine();

                registerInvestor(conn, name, email, focus);
            } else {
                System.out.println("Invalid role selected.");
            }

            scanner.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void registerFarmer(Connection conn, String name, String email, String region, String tractorNeed) throws SQLException {
        String sql = "INSERT INTO farmers (name, email, region, tractor_need) VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.setString(3, region);
            pstmt.setString(4, tractorNeed);
            pstmt.executeUpdate();
            System.out.println("Farmer registered successfully.");
        }
    }

    private static void registerInvestor(Connection conn, String name, String email, String focus) throws SQLException {
        String sql = "INSERT INTO investors (name, email, investment_focus) VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.setString(3, focus);
            pstmt.executeUpdate();
            System.out.println("Investor registered successfully.");
        }
    }
    <script>
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.fade-in.hidden');
  hiddenElements.forEach(el => observer.observe(el));
</script>

}
