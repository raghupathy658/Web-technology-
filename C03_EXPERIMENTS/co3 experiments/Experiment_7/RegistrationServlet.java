import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * Experiment 7: Student Registration Servlet
 * Demonstrates doPost(), request.getParameter(), server-side validation, and HTML response generation.
 */
@WebServlet("/register")
public class RegistrationServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        // 1. Retrieve parameters using request.getParameter()
        String name = request.getParameter("studentName");
        String regNo = request.getParameter("regNo");
        String email = request.getParameter("email");
        String department = request.getParameter("department");
        String semester = request.getParameter("semester");

        // 2. Validate empty fields
        List<String> errors = new ArrayList<>();
        if (name == null || name.trim().isEmpty()) errors.add("Student Name is required.");
        if (regNo == null || regNo.trim().isEmpty()) errors.add("Register Number is required.");
        if (email == null || email.trim().isEmpty()) errors.add("Email Address is required.");
        if (department == null || department.trim().isEmpty()) errors.add("Department selection is required.");
        if (semester == null || semester.trim().isEmpty()) errors.add("Semester selection is required.");

        out.println("<!DOCTYPE html>");
        out.println("<html lang='en'>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'>");
        out.println("<title>Registration Result</title>");
        out.println("<style>");
        out.println("body { font-family: 'Segoe UI', sans-serif; background-color: #0f172a; color: #f8fafc; padding: 2rem; }");
        out.println(".card { max-width: 600px; margin: 2rem auto; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 2rem; }");
        out.println("h2 { color: #6366f1; border-bottom: 2px solid rgba(99,102,241,0.3); padding-bottom: 0.5rem; margin-bottom: 1.5rem; }");
        out.println(".error-box { background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: 8px; padding: 1rem; color: #fca5a5; margin-bottom: 1.5rem; }");
        out.println(".success-box { background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; padding: 1rem; color: #6ee7b7; margin-bottom: 1.5rem; }");
        out.println("table { width: 100%; border-collapse: collapse; margin-top: 1rem; }");
        out.println("th, td { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; }");
        out.println("th { background: #0f172a; color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; }");
        out.println("td { color: #f8fafc; font-size: 0.95rem; }");
        out.println(".btn { display: inline-block; margin-top: 1.5rem; padding: 0.65rem 1.25rem; background: #334155; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='card'>");

        if (!errors.isEmpty()) {
            // Display Validation Errors
            out.println("<h2>Registration Error</h2>");
            out.println("<div class='error-box'>");
            out.println("<strong>Please correct the following errors:</strong>");
            out.println("<ul style='margin-top: 0.5rem; padding-left: 1.2rem;'>");
            for (String err : errors) {
                out.println("<li>" + err + "</li>");
            }
            out.println("</ul>");
            out.println("</div>");
            out.println("<a href='registration.html' class='btn'>← Back to Form</a>");
        } else {
            // Display Submitted Details in HTML Table
            out.println("<h2>Student Registration Successful</h2>");
            out.println("<div class='success-box'>✓ Registration details received and validated successfully!</div>");
            
            out.println("<table>");
            out.println("<thead><tr><th>Field</th><th>Submitted Value</th></tr></thead>");
            out.println("<tbody>");
            out.println("<tr><td><strong>Student Name</strong></td><td>" + name.trim() + "</td></tr>");
            out.println("<tr><td><strong>Register Number</strong></td><td style='font-family:monospace; color:#38bdf8;'>" + regNo.trim() + "</td></tr>");
            out.println("<tr><td><strong>Email Address</strong></td><td>" + email.trim() + "</td></tr>");
            out.println("<tr><td><strong>Department</strong></td><td>" + department + "</td></tr>");
            out.println("<tr><td><strong>Semester</strong></td><td>" + semester + "</td></tr>");
            out.println("</tbody>");
            out.println("</table>");

            out.println("<a href='registration.html' class='btn'>← Register Another Student</a>");
        }

        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.sendRedirect("registration.html");
    }
}
