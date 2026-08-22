import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

/**
 * Experiment 6: Welcome Servlet Application
 * Demonstrates HttpServlet, doGet(), HttpServletRequest, HttpServletResponse, and PrintWriter.
 */
@WebServlet("/welcome")
public class WelcomeServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Set response content type
        response.setContentType("text/html;charset=UTF-8");

        // Obtain PrintWriter
        PrintWriter out = response.getWriter();

        // Get current Date and Time
        String currentDate = LocalDate.now().format(DateTimeFormatter.ofPattern("EEEE, MMMM dd, yyyy"));
        String currentTime = LocalTime.now().format(DateTimeFormatter.ofPattern("hh:mm:ss a"));

        // Generate dynamic HTML response
        out.println("<!DOCTYPE html>");
        out.println("<html lang='en'>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'>");
        out.println("<title>Welcome Servlet</title>");
        out.println("<style>");
        out.println("body { font-family: 'Segoe UI', sans-serif; background-color: #0f172a; color: #f8fafc; padding: 2rem; }");
        out.println(".card { max-width: 600px; margin: 2rem auto; background: #1e293b; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 2rem; box-shadow: 0 8px 24px rgba(0,0,0,0.4); }");
        out.println("h1 { color: #6366f1; border-bottom: 2px solid rgba(99,102,241,0.3); padding-bottom: 0.5rem; margin-bottom: 1.5rem; }");
        out.println(".info-row { display: flex; justify-content: space-between; margin-bottom: 1rem; padding: 0.75rem; background: rgba(15,23,42,0.6); border-radius: 6px; }");
        out.println(".label { color: #94a3b8; font-weight: 600; }");
        out.println(".value { color: #38bdf8; font-weight: 700; }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='card'>");
        out.println("<h1>Welcome to Web Technology Laboratory</h1>");
        
        out.println("<div class='info-row'><span class='label'>Welcome Message:</span><span class='value'>Hello & Welcome to Java Servlets!</span></div>");
        out.println("<div class='info-row'><span class='label'>Student Name:</span><span class='value'>Sadhanandhan R</span></div>");
        out.println("<div class='info-row'><span class='label'>Course Name:</span><span class='value'>Web Technology Laboratory (CS3481)</span></div>");
        out.println("<div class='info-row'><span class='label'>Current Date:</span><span class='value'>" + currentDate + "</span></div>");
        out.println("<div class='info-row'><span class='label'>Current Time:</span><span class='value'>" + currentTime + "</span></div>");

        out.println("<p style='text-align:center; margin-top:1.5rem;'><a href='index.html' style='color:#6366f1;'>← Back to Index</a></p>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
}
