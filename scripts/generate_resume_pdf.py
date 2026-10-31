import os

def create_resume_pdf(output_path):
    lines = [
        ("JERSHIKA C", 20, True, 40, 750),
        ("JAVA FULL STACK DEVELOPER", 13, True, 40, 730),
        ("Email: jershika2612@gmail.com | Phone: +91-6369190238 | Location: Kanyakumari, Nagercoil, Tamil Nadu", 9, False, 40, 712),
        ("LinkedIn: linkedin.com/in/jershika-c-10bbb032b | GitHub: github.com/jershika26", 9, False, 40, 698),
        
        ("---------------------------------------------------------------------------------------------------------------------------------", 9, False, 40, 686),
        ("PROFILE SUMMARY", 11, True, 40, 674),
        ("Enthusiastic Computer Science Engineering student with Honors, skilled in Java, and full-stack web development.", 9, False, 40, 658),
        ("Passionate about building responsive and user-friendly web applications using modern technologies. Strong in", 9, False, 40, 646),
        ("problem-solving and quick learning, with hands-on experience in developing efficient front-end and back-end solutions.", 9, False, 40, 634),
        
        ("---------------------------------------------------------------------------------------------------------------------------------", 9, False, 40, 622),
        ("TECHNICAL SKILLS", 11, True, 40, 610),
        ("Programming Languages: Java, Python", 9, False, 40, 595),
        ("Frontend Technologies: HTML, CSS, JavaScript, Bootstrap, React, React Bootstrap, TypeScript", 9, False, 40, 583),
        ("Backend Technologies: Core Java, OOPs, Spring Boot, REST APIs, JPA/Hibernate, Nest.js", 9, False, 40, 571),
        ("Databases & Cloud: MySQL, PostgreSQL, Supabase, MongoDB", 9, False, 40, 559),
        ("Libraries & Tools: VS Code, GitHub, Eclipse IDE, IntelliJ IDEA, Postman, Git, NetBeans IDE, Axios, OpenCV", 9, False, 40, 547),
        ("Soft Skills: Problem Solving, Quick Learning, Leadership, Team Collaboration, Time Management", 9, False, 40, 535),
        
        ("---------------------------------------------------------------------------------------------------------------------------------", 9, False, 40, 523),
        ("PROFESSIONAL EXPERIENCE", 11, True, 40, 511),
        ("Full Stack Developer | Imperial Info System, Chennai (Aug 2026 - Present)", 9, True, 40, 497),
        ("- Developed responsive web applications using React.js and modern frontend technologies with UX focus.", 9, False, 45, 485),
        ("- Implemented REST API integrations and functional features, contributing to efficient application performance.", 9, False, 45, 473),
        
        ("Python Full Stack Intern | Agile Infotech, Kerala (June 2025 - July 2025)", 9, True, 40, 458),
        ("- Built three Python-based applications and integrated data storage using MongoDB.", 9, False, 45, 446),
        ("- Integrated frontend and backend functionalities to enable seamless data exchange.", 9, False, 45, 434),
        
        ("Full Stack Web Development Intern | Ak Info Park, Kanyakumari (Feb 2025 - Feb 2025)", 9, True, 40, 419),
        ("- Developed five responsive webpages using HTML, CSS, and JavaScript.", 9, False, 45, 407),
        ("- Integrated frontend and backend, improving data flow efficiency and reducing API response issues by 15%.", 9, False, 45, 395),
        
        ("Python and Data Analysis Intern | Srishti Innovative Computer Systems, Kerala (Feb 2024 - Mar 2024)", 9, True, 40, 380),
        ("- Processed and cleaned three datasets using Python for data analysis and reporting.", 9, False, 45, 368),
        ("- Created interactive charts and reports using Python libraries to visualize project insights.", 9, False, 45, 356),
        
        ("---------------------------------------------------------------------------------------------------------------------------------", 9, False, 40, 344),
        ("PROJECTS", 11, True, 40, 332),
        ("Real Estate Management System (Java, Spring Boot, REST APIs, JPA/Hibernate, PostgreSQL, Supabase, React)", 9, True, 40, 318),
        ("- Backend application with Spring Boot for CRUD operations on buyer, seller, and property data.", 9, False, 45, 306),
        ("- Integrated PostgreSQL hosted on Supabase using JPA/Hibernate; implemented search, filtering and validation.", 9, False, 45, 294),
        
        ("Mydoo - School Management Platform (React.js, TypeScript, REST APIs)", 9, True, 40, 279),
        ("- Developed school management platform with responsive UI and REST API integration.", 9, False, 45, 267),
        ("- Implemented school profile management, admission details, and location-based search functionality.", 9, False, 45, 255),
        
        ("Real-Time Traffic Forecasting & Congestion Control (Python, Flask, XGBoost, OpenCV, YOLO, HTML, Bootstrap)", 9, True, 40, 240),
        ("- Intelligent traffic management system for real-time congestion prediction and dynamic signal control.", 9, False, 45, 228),
        
        ("Underwater Object Recognition System (Python, OpenCV, NumPy, Image Processing)", 9, True, 40, 213),
        ("- Computer-vision model to detect underwater objects using HSV segmentation (92% accuracy on 500+ images).", 9, False, 45, 201),
        
        ("House of Greens - Business Website (React.js, React Bootstrap, JavaScript, WhatsApp API)", 9, True, 40, 186),
        ("- Responsive business website with WhatsApp integration for direct customer communication.", 9, False, 45, 174),
        
        ("---------------------------------------------------------------------------------------------------------------------------------", 9, False, 40, 162),
        ("EDUCATION", 11, True, 40, 150),
        ("B.E. Computer Science Engineering (Honors) | Ponjesly College of Engineering | CGPA: 8.51", 9, False, 40, 136),
        ("HSC Computer Science | St. Joseph's Convent HSS, Nagercoil | Percentage: 73.17%", 9, False, 40, 124),
        ("SSLC | St. Joseph's Convent HSS, Nagercoil | Percentage: 74.6%", 9, False, 40, 112),
        
        ("---------------------------------------------------------------------------------------------------------------------------------", 9, False, 40, 100),
        ("COURSES & CERTIFICATIONS", 11, True, 40, 88),
        ("Full Stack Web Development & Java (Feb 14, 2024 - Mar 3, 2024)", 9, True, 40, 74),
        ("- Practical knowledge of HTML, CSS, JS, React.js, React Bootstrap, Java, Spring Boot, REST APIs, Axios.", 9, False, 45, 62)
    ]

    stream_content = "BT\n"
    for text, size, is_bold, x, y in lines:
        font = "/F2" if is_bold else "/F1"
        clean_text = text.replace("(", "\\(").replace(")", "\\)")
        stream_content += f"{font} {size} Tf\n{x} {y} Td\n({clean_text}) Tj\n{-x} {-y} Td\n"
    stream_content += "ET\n"
    stream_bytes = stream_content.encode("latin-1")
    stream_len = len(stream_bytes)

    objects = []
    # 1: Catalog
    objects.append(b"1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n")
    # 2: Pages
    objects.append(b"2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n")
    # 3: Page
    objects.append(b"3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >> endobj\n")
    # 4: Regular Font
    objects.append(b"4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n")
    # 5: Bold Font
    objects.append(b"5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> endobj\n")
    # 6: Contents
    obj6_header = f"6 0 obj << /Length {stream_len} >> stream\n".encode("latin-1")
    obj6_footer = b"endstream\nendobj\n"
    objects.append(obj6_header + stream_bytes + obj6_footer)

    header = b"%PDF-1.4\n"
    offsets = [0]
    current_offset = len(header)
    for obj in objects:
        offsets.append(current_offset)
        current_offset += len(obj)

    xref_offset = current_offset
    xref = f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n".encode("latin-1")
    for off in offsets[1:]:
        xref += f"{off:010d} 00000 n \n".encode("latin-1")

    trailer = f"trailer << /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode("latin-1")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "wb") as f:
        f.write(header)
        for obj in objects:
            f.write(obj)
        f.write(xref)
        f.write(trailer)

    print(f"Generated PDF at {output_path} ({current_offset} bytes)")

if __name__ == "__main__":
    create_resume_pdf("public/Jershika_C_Resume.pdf")
