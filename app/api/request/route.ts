import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.school || !data.title) {
      return NextResponse.json(
        { error: true, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const message = {
      from: process.env.PUBLIC_EMAIL_ID,
      replyTo: data.email,
      to: ["hello@myrooz.com"], // Update with your ROOZ emails
      //   to: ["davisisibor@gmail.com"], // Testing email
      subject: `New Live Unlock Request - ${data.name} from ${data.school}`,
      text: `New live unlock request from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #ec4899 0%, #ff004c 100%);
                color: white;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
                margin-bottom: 30px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 10px;
                border: 1px solid #e0e0e0;
              }
              .field {
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e0e0e0;
              }
              .field:last-child {
                border-bottom: none;
              }
              .label {
                font-weight: bold;
                color: #555;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .value {
                font-size: 16px;
                color: #333;
                margin-top: 5px;
              }
              .badge {
                background: linear-gradient(135deg, #ec4899 0%, #ff004c 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                display: inline-block;
                font-size: 12px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 20px;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e0e0e0;
                text-align: center;
                color: #888;
                font-size: 12px;
              }
              .timestamp {
                background: #f0f0f0;
                padding: 10px;
                border-radius: 5px;
                font-size: 12px;
                color: #666;
                margin-top: 20px;
              }
              .action-needed {
                background: #fff3cd;
                border: 2px solid #ffc107;
                border-radius: 8px;
                padding: 15px;
                margin-top: 20px;
                text-align: center;
              }
              .action-needed strong {
                color: #856404;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🔓 New Live Unlock Request</h1>
            </div>
            
            <div class="content">
              <div class="badge">Live Unlock Demo Request</div>

              <div class="field">
                <div class="label">Contact Name</div>
                <div class="value">${data.name}</div>
              </div>

              <div class="field">
                <div class="label">Title/Position</div>
                <div class="value">${data.title}</div>
              </div>

              <div class="field">
                <div class="label">School/District</div>
                <div class="value">${data.school}</div>
              </div>

              <div class="field">
                <div class="label">Email Address</div>
                <div class="value">
                  <a href="mailto:${data.email}" style="color: #ec4899; text-decoration: none;">
                    ${data.email}
                  </a>
                </div>
              </div>

              ${
                data.phone
                  ? `
              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value">
                  <a href="tel:${data.phone}" style="color: #ec4899; text-decoration: none;">
                    ${data.phone}
                  </a>
                </div>
              </div>
              `
                  : `
              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value" style="color: #999; font-style: italic;">Not provided</div>
              </div>
              `
              }

              <div class="action-needed">
                <strong>⏰ Action Required:</strong> Schedule a live unlock demonstration
              </div>

              <div class="timestamp">
                <strong>Submitted:</strong> ${new Date().toLocaleString(
                  "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZoneName: "short",
                  }
                )}
              </div>
            </div>

            <div class="footer">
              <p>This request was received from the ROOZ landing page</p>
              <p style="color: #ec4899; font-weight: bold;">myrooz.com/unlock</p>
              <p>© ${new Date().getFullYear()} ROOZ. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    };

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.PUBLIC_EMAIL_ID,
        pass: process.env.PUBLIC_EMAIL_ID_KEY,
      },
    });

    const response = await transporter.sendMail(message);

    return NextResponse.json(
      {
        error: false,
        emailSent: true,
        message: "Request submitted successfully!",
        response,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      {
        error: true,
        emailSent: false,
        message: "Failed to submit request",
        errors: [error.message],
      },
      { status: 500 }
    );
  }
}
