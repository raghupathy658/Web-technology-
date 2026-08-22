import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * Experiment 10 (Part A): Unsafe Visitor Counter Servlet
 * Uses primitive instance variable 'visitorCount++' which is thread-unsafe under concurrent requests.
 */
@WebServlet("/unsafe-visitor")
public class UnsafeVisitorServlet extends HttpServlet {

    // THREAD UNSAFE: Primitive shared instance variable
    private int visitorCount = 0;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Non-atomic read-modify-write operation (race condition vulnerability)
        visitorCount++;

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        out.println("<!DOCTYPE html>");
        out.println("<html lang='en'>");
        out.println("<head>");
        out.println("<meta charset='UTF-8'>");
        out.println("<title>Unsafe Visitor Counter</title>");
        out.println("<style>");
        out.println("body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }");
        out.println(".card { max-width: 600px; margin: 2rem auto; background: #1e293b; border: 1px solid #ef4444; border-radius: 12px; padding: 2rem; }");
        out.println("h2 { color: #ef4444; margin-bottom: 1rem; }");
        out.println(".count-box { font-size: 3rem; font-weight: 800; color: #fca5a5; margin: 1rem 0; }");
        out.println(".btn { display: inline-block; padding: 0.65rem 1.25rem; background: #334155; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; }");
        out.println("</style>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div class='card'>");
        out.println("<h2>⚠️ Thread-Unsafe Visitor Counter</h2>");
        out.println("<p style='color:#94a3b8;'>Uses primitive <code>int visitorCount = 0;</code> incremented via <code>visitorCount++</code>.</p>");
        out.println("<div class='count-box'>" + visitorCount + "</div>");
        out.println("<p style='font-size:0.88rem; color:#fca5a5; margin-bottom:1.5rem;'>Under high concurrent requests, multiple threads reading and writing 'visitorCount' simultaneously will cause race conditions and lost updates!</p>");
        out.println("<a href='index.html' class='btn'>← Back to Thread Safety Index</a>");
        out.println("</div>");
        out.println("</body>");
        out.println("</html>");
    }
}
