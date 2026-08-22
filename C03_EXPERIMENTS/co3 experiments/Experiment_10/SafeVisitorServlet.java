import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Experiment 10 (Part B): Safe Visitor Counter Servlet
 * Uses AtomicInteger with incrementAndGet() for lock-free thread safety.
 */
@WebServlet("/safe-visitor")
public class SafeVisitorServlet extends HttpServlet {

    // THREAD SAFE: AtomicInteger shared instance variable
    private final AtomicInteger visitorCount = new AtomicInteger(0);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Atomic increment operation
        int currentCount = visitorCount.incrementAndGet();

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        out.println("<!DOCTYPE html>");
        out.println("<html lang='en'>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'>");
        out.println("<title>Safe Visitor Counter</title>");
        out.println("<style>");
        out.println("body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }");
        out.println(".card { max-width: 600px; margin: 2rem auto; background: #1e293b; border: 1px solid #10b981; border-radius: 12px; padding: 2rem; }");
        out.println("h2 { color: #10b981; margin-bottom: 1rem; }");
        out.println(".count-box { font-size: 3rem; font-weight: 800; color: #34d399; margin: 1rem 0; }");
        out.println(".btn { display: inline-block; padding: 0.65rem 1.25rem; background: #334155; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='card'>");
        out.println("<h2>✓ Thread-Safe Visitor Counter</h2>");
        out.println("<p style='color:#94a3b8;'>Uses <code>AtomicInteger</code> with <code>incrementAndGet()</code>.</p>");
        out.println("<div class='count-box'>" + currentCount + "</div>");
        out.println("<p style='font-size:0.88rem; color:#6ee7b7; margin-bottom:1.5rem;'>AtomicInteger uses low-level hardware CAS instructions to guarantee atomic increments across concurrent request threads!</p>");
        out.println("<a href='index.html' class='btn'>← Back to Thread Safety Index</a>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
}
