<p align="center">
  <img src="static/images/logo.png" alt="SevaSetu Logo" width="200"/>
</p>

---

# 🌱 SevaSetu — Bridging Helping Hands to Hopeful Hearts.

**SevaSetu** is a Flask + Firebase + Gemini AI powered web platform that connects NGOs with skilled volunteers to address urgent community needs — intelligently and instantly.

Instead of relying on scattered paper surveys and fragmented communication, NGOs can upload field reports, let AI extract community needs automatically, and get matched with the right volunteers nearby in real time.

---

## 🚀 Features

### 🧠 Core Features

- 📄 **AI-Powered Need Extraction** — Upload field reports (PDF/image), Gemini AI automatically identifies and structures community needs
- 🗺️ **Needs Heatmap** — Leaflet-based live map showing urgency hotspots across areas
- 🤝 **Smart Volunteer Matching** — Skill + location + availability based scoring algorithm suggests best-fit volunteers
- 🔔 **Real-time Notifications** — FCM push notifications alert matched volunteers instantly
- 💬 **Direct Chat** — NGOs and volunteers communicate in-context, linked to specific needs
- 📍 **Location-Based Discovery** — Volunteers discover nearby needs on an interactive map
- 🔐 **Multi-role Auth** — Separate flows for NGO coordinators, volunteers, and admins
- ✅ **Task Lifecycle Tracking** — Full status flow from Open → Matched → Accepted → In Progress → Completed

### 🔮 Future Enhancements

- 📊 **Impact Analytics Dashboard** — Track volunteer hours, needs resolved, communities served
- 🌐 **Multilingual Support** — Regional language support for field workers
- 📱 **PWA Support** — Offline-capable mobile experience
- 🤖 **AI Volunteer Recommendations** — Proactive suggestions based on volunteer history
- 🧾 **Auto-generated Impact Reports** — PDF reports for NGO grant applications

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Flask (Python) |
| **Database** | Firebase Firestore |
| **Authentication** | Firebase Auth (Google + Email) |
| **Storage** | ImageKit (field reports + profile photos) |
| **Maps** | Leaflet + OpenStreetMap + Leaflet.heat |
| **AI** | Gemini 2.5 Flash API (need extraction + classification) |
| **Notifications** | Firebase Cloud Messaging (FCM) |
| **Hosting** | Vercel / Render |

---

## ⚙️ Project Structure

```
sevasetu/
│
├── app.py                        # Main Flask application
├── requirements.txt              # Project dependencies
│
├── templates/
│   ├── base.html
│   ├── home.html
│   ├── getstarted.html
│   ├── select_role.html
│   ├── ngo/
│   │   ├── onboarding.html
│   │   ├── dashboard.html
│   │   ├── upload.html
│   │   ├── needs.html
│   │   ├── need_detail.html
│   │   └── need_create.html
│   ├── volunteer/
│   │   ├── onboarding.html
│   │   ├── dashboard.html
│   │   ├── tasks.html
│   │   ├── task_detail.html
│   │   └── map.html
│   ├── inbox.html
│   └── admin/
│       └── dashboard.html
│
├── static/
│   ├── css/
│   ├── js/
│   └── images/
│
└── services/
    ├── firebase_service.py       # Firestore CRUD helpers
    ├── upload.py                 # ImageKit upload helpers
    ├── gemini_service.py         # Gemini AI extraction + classification
    └── matching.py               # Volunteer matching algorithm
```

---

## 🧠 How It Works

1. 🏢 **NGO registers** and completes organization onboarding (name, location, description).
2. 📄 **NGO uploads** a field report PDF or image from the ground.
3. 🤖 **Gemini AI extracts** structured community needs — title, urgency score, category, required skills, location.
4. ✅ **NGO reviews** and confirms extracted needs — they go live on the map.
5. 🗺️ **Heatmap updates** showing urgency hotspots across the city.
6. ⚙️ **Matching engine runs** — scores volunteers by skill overlap, distance, and availability.
7. 🔔 **Top 3 volunteers get notified** via FCM push notification.
8. 🙋 **Volunteer accepts** the task — status updates live across the platform.
9. 💬 **NGO and volunteer chat** directly, linked to the specific need.
10. ✅ **Volunteer marks complete** — uploads photo proof, NGO rates the volunteer.

---

## 🪜 Installation & Setup

1. **Clone the repo**
```bash
git clone https://github.com/yourusername/sevasetu.git
cd sevasetu
```

2. **Create a virtual environment**
```bash
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # Mac/Linux
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Setup Firebase**
   - Create a Firebase project
   - Enable Firestore + Authentication (Google + Email)
   - Download service account key
   - Set environment variables:
```bash
FIREBASE_CONFIG=<your service account JSON as string>
FIREBASE_API_KEY=<your web api key>
FIREBASE_AUTH_DOMAIN=<your auth domain>
FIREBASE_PROJECT_ID=<your project id>
FIREBASE_STORAGE_BUCKET=<your storage bucket>
FIREBASE_MESSAGING_SENDER_ID=<your sender id>
FIREBASE_APP_ID=<your app id>
FIREBASE_VAPID_KEY=<your vapid key for FCM>
```

5. **Setup Gemini AI**
```bash
GEMINI_API_KEY=<your gemini api key>
```

6. **Setup ImageKit**
```bash
IMAGEKIT_PRIVATE_KEY=<your private key>
IMAGEKIT_PUBLIC_KEY=<your public key>
IMAGEKIT_URL_ENDPOINT=<your url endpoint>
```

7. **Run the app**
```bash
python app.py
```

8. **Open in browser**
```
http://127.0.0.1:5000/
```

---

## 👥 User Roles

| Role | What They Do |
|------|-------------|
| **NGO Coordinator** | Upload reports, post needs, manage volunteers, track progress |
| **Volunteer** | Browse matched tasks, accept work, update status, chat with NGO |
| **Admin** | Verify NGOs, manage users, view system-wide activity |

---

## 🤝 Matching Algorithm

Volunteers are scored against each need using three weighted factors:

```python
skill_match  = len(volunteer.skills ∩ need.required_skills)  # 40%
distance     = haversine(volunteer.location, need.location)   # 40%
urgency      = need.urgency_score / 10                        # 20%

final_score  = (skill_match * 40) 
             + (max(0, 10 - distance) * 40) 
             + (urgency * 20)
```

Top 3 scored volunteers are suggested to the NGO and notified via FCM.

---

## 🏆 Why SevaSetu?

- 🤖 AI eliminates manual data entry from field reports
- 📍 Location-aware matching puts the right person in the right place
- 🔔 Instant notifications mean no need goes unaddressed
- 💬 In-context chat keeps coordination clean and traceable
- 🗺️ Heatmap makes urgency visible at a glance
- 🇮🇳 Built for the Indian NGO and volunteer ecosystem

---

## 🤝 Contributing

Pull requests are welcome.
If you'd like to add features like multilingual support, PWA, or analytics — open an issue first to discuss.

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).

---

> *"Skill deserves direction. SevaSetu points it where it matters most."*
