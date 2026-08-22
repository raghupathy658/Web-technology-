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
 * Experiment 8: Student Marks Processing Servlet Application
 * Calculates Total, Average, Highest, Lowest, Grade, and Pass/Fail evaluation.
 */
@WebServlet("/result")
public class ResultServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String name = request.getParameter("studentName");
        String regNo = request.getParameter("regNo");
        
        List<String> errors = new ArrayList<>();

        if (name == null || name.trim().isEmpty()) errors.add("Student Name is required.");
        if (regNo == null || regNo.trim().isEmpty()) errors.add("Register Number is required.");

        int[] marks = new int[5];
        String[] subNames = {"Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5"};

        // Validate Subject Marks
        for (int i = 0; i < 5; i++) {
            String paramVal = request.getParameter("sub" + (i + 1));
            if (paramVal == null || paramVal.trim().isEmpty()) {
                errors.add(subNames[i] + " mark is missing.");
            } else {
                try {
                    int mark = Integer.parseInt(paramVal.trim());
                    if (mark < 0 || mark > 100) {
                        errors.add(subNames[i] + " mark must be between 0 and 100.");
                    } else {
                        marks[i] = mark;
                    }
                } catch (NumberFormatException e) {
                    errors.add(subNames[i] + " mark must be a valid numeric integer.");
                }
            }
        }

        out.println("<!DOCTYPE html>");
        out.println("<html lang='en'>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'>");
        out.println("<title>Marks Evaluation Result</title>");
        out.println("<style>");
        out.println("body { font-family: 'Segoe UI', sans-serif; background-color: #0f172a; color: #f8fafc; padding: 2rem; }");
        out.println(".card { max-width: 650px; margin: 2rem auto; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 2rem; }");
        out.println("h2 { color: #6366f1; border-bottom: 2px solid rgba(99,102,241,0.3); padding-bottom: 0.5rem; margin-bottom: 1.5rem; }");
        out.println(".error-box { background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: 8px; padding: 1rem; color: #fca5a5; margin-bottom: 1.5rem; }");
        out.println("table { width: 100%; border-collapse: collapse; margin: 1rem 0; }");
        out.println("th, td { padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); text-align: left; }");
        out.println("th { background: #0f172a; color: #94a3b8; font-size: 0.85rem; text-transform: uppercase; }");
        out.println("td { color: #f8fafc; font-size: 0.95rem; }");
        out.println(".badge-pass { background: rgba(16,185,129,0.2); color: #34d399; border: 1px solid rgba(16,185,129,0.4); padding: 0.25rem 0.75rem; border-radius: 50px; font-weight: bold; }");
        out.println(".badge-fail { background: rgba(239,68,68,0.2); color: #fca5a5; border: 1px solid rgba(239,68,68,0.4); padding: 0.25rem 0.75rem; border-radius: 50px; font-weight: bold; }");
        out.println(".btn { display: inline-block; margin-top: 1.5rem; padding: 0.65rem 1.25rem; background: #334155; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='card'>");

        if (!errors.isEmpty()) {
            out.println("<h2>Marks Evaluation Error</h2>");
            out.println("<div class='error-box'>");
            out.println("<strong>Please correct the following errors:</strong>");
            out.println("<ul style='margin-top: 0.5rem; padding-left: 1.2rem;'>");
            for (String err : errors) {
                out.println("<li>" + err + "</li>");
            }
            out.println("</ul>");
            out.println("</div>");
            out.println("<a href='marks.html' class='btn'>← Back to Marks Form</a>");
        } else {
            // Perform Calculations
            int total = 0;
            int max = marks[0];
            int min = marks[0];
            boolean isPass = true;

            for (int mark : marks) {
                total += mark;
                if (mark > max) max = mark;
                if (mark < min) min = mark;
                if (mark < 40) isPass = false; // PASS only when ALL 5 subjects >= 40
            }

            double average = total / 5.0;

            // Grading System
            String grade;
            if (average >= 90) grade = "A+";
            else if (average >= 80) grade = "A";
            else if (average >= 70) grade = "B";
            else if (average >= 60) grade = "C";
            else if (average >= 50) grade = "D";
            else if (average >= 40) grade = "E";
            else grade = "F";

            out.println("<h2>Student Academic Result Report</h2>");
            out.println("<div style='display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;'>");
            out.println("<div><strong>Name:</strong> " + name.trim() + " | <strong>Reg No:</strong> <span style='font-family:monospace; color:#38bdf8;'>" + regNo.trim() + "</span></div>");
            out.println("<div>" + (isPass ? "<span class='badge-pass'>PASS</span>" : "<span class='badge-fail'>FAIL</span>") + "</div>");
            out.println("</div>");

            out.println("<table>");
            out.println("<thead><tr><th>Subject</th><th>Mark (out of 100)</th><th>Status</th></tr></thead>");
            out.println("<tbody>");
            for (int i = 0; i < 5; i++) {
                out.println("<tr><td>" + subNames[i] + "</td><td>" + marks[i] + "</td><td>" + (marks[i] >= 40 ? "<span style='color:#34d399;'>Pass</span>" : "<span style='color:#fca5a5;'>Fail (&lt;40)</span>") + "</td></tr>");
            }
            out.println("</tbody>");
            out.println("</table>");

            out.println("<h3>Summary Statistics</h3>");
            out.println("<table>");
            out.println("<tbody>");
            out.println("<tr><td><strong>Total Marks:</strong></td><td>" + total + " / 500</td></tr>");
            out.println("<tr><td><strong>Average Score:</strong></td><td>" + String.format("%.2f", average) + "%</td></tr>");
            out.println("<tr><td><strong>Highest Mark:</strong></td><td style='color:#34d399; font-weight:bold;'>" + max + "</td></tr>");
            out.println("<tr><td><strong>Lowest Mark:</strong></td><td style='color:#fca5a5; font-weight:bold;'>" + min + "</td></tr>");
            out.println("<tr><td><strong>Overall Grade:</strong></td><td><strong style='font-size:1.2rem; color:#6366f1;'>" + grade + "</strong></td></tr>");
            out.println("</tbody>");
            out.println("</table>");

            out.println("<a href='marks.html' class='btn'>← Calculate Another Student Marks</a>");
        }

        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.sendRedirect("marks.html");
    }
}
