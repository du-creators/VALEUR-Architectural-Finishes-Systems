/**
 * Google Calendar API integration service for scheduling architectural consultations.
 */

export interface ConsultationEventDetails {
  practiceName: string;
  specifierName: string;
  email: string;
  dateStr: string; // YYYY-MM-DD
  timeStr?: string; // HH:MM
  projectName: string;
  specifiedMaterialsCount: number;
}

export async function scheduleConsultationInGoogleCalendar(
  accessToken: string,
  details: ConsultationEventDetails
): Promise<{ success: boolean; eventLink?: string; error?: string }> {
  try {
    const startHour = details.timeStr || '14:00';
    const startDateTime = new Date(`${details.dateStr}T${startHour}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 45 * 60 * 1000); // 45-minute consultation

    const eventPayload = {
      summary: `VALEUR Atelier — Architectural Specimen & Facade Review: ${details.projectName}`,
      description: `Architectural consultation and tactile specimen review session.\n\nPractice: ${details.practiceName}\nLead Specifier: ${details.specifierName} (${details.email})\nCurated Finishes: ${details.specifiedMaterialsCount} item(s)\nLocation: VALEUR Atelier Showroom & Virtual VR Stream`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: [
        { email: details.email, displayName: details.specifierName },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `Failed to create calendar event (${res.status})`);
    }

    const data = await res.json();
    return {
      success: true,
      eventLink: data.htmlLink,
    };
  } catch (error: any) {
    console.error('Calendar creation failed:', error);
    return {
      success: false,
      error: error.message || 'Error communicating with Google Calendar',
    };
  }
}
