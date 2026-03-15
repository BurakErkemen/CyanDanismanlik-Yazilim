import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Admin claim ekle
export const setAdminClaim = functions.https.onCall(async (request) => {
  // Sadece mevcut admin çağırabilir
  if (!request.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Giriş yapmalısınız.");
  }

  const callerUid = request.auth.uid;
  const callerRecord = await admin.auth().getUser(callerUid);
  const callerClaims = callerRecord.customClaims as Record<string, unknown> | undefined;

  if (!callerClaims?.admin) {
    throw new functions.https.HttpsError("permission-denied", "Yetkiniz yok.");
  }

  const { uid } = request.data;
  if (!uid) {
    throw new functions.https.HttpsError("invalid-argument", "UID gerekli.");
  }

  await admin.auth().setCustomUserClaims(uid, { admin: true });
  return { success: true };
});

// İlk admin kurulumu — sadece bir kez çalıştır, sonra sil
export const setupFirstAdmin = functions.https.onRequest(async (req, res) => {
  const uid = req.query.uid as string;
  const secret = req.query.secret as string;

  if (secret !== "CYAN_SETUP_2026") {
    res.status(403).send("Yetkisiz erişim.");
    return;
  }

  if (!uid) {
    res.status(400).send("UID gerekli.");
    return;
  }

  await admin.auth().setCustomUserClaims(uid, { admin: true });
  res.send(`✓ ${uid} kullanıcısına admin yetkisi verildi.`);
});