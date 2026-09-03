<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:template match="courses">
    <table>
      <thead><tr><th>Course Code</th><th>Course Name</th><th>Faculty</th><th>Students</th><th>Credits</th><th>Type</th></tr></thead>
      <tbody>
        <xsl:for-each select="course[students &gt; 40]">
          <xsl:sort select="students" data-type="number" order="descending" />
          <tr><td><xsl:value-of select="code" /></td><td><xsl:value-of select="name" /></td><td><xsl:value-of select="faculty" /></td><td><xsl:value-of select="students" /></td><td><xsl:value-of select="credits" /></td><td><xsl:value-of select="type" /></td></tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
</xsl:stylesheet>