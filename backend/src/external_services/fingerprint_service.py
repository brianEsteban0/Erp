from flask import Flask, jsonify, request
import subprocess
import logging

app = Flask(__name__)

# Configurar el logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/enroll', methods=['POST'])
def enroll():
    user_id = request.json.get('user_id')
    if not user_id:
        app.logger.error("user_id is required")
        return jsonify({"error": "user_id is required"}), 400

    result = subprocess.run(['fprintd-enroll', user_id], capture_output=True, text=True)
    if result.returncode != 0:
        app.logger.error(f"Enrollment failed: {result.stderr}")
        return jsonify({"error": "Failed to enroll fingerprint"}), 500

    return jsonify({"message": "Fingerprint enrolled successfully"}), 200

@app.route('/verify', methods=['POST'])
def verify():
    user_id = request.json.get('user_id')
    if not user_id:
        app.logger.error("user_id is required")
        return jsonify({"error": "user_id is required"}), 400

    result = subprocess.run(['fprintd-verify', user_id], capture_output=True, text=True)
    if result.returncode != 0:
        app.logger.error(f"Verification failed: {result.stderr}")
        return jsonify({"error": "Failed to verify fingerprint"}), 500

    return jsonify({"message": "Fingerprint verified successfully"}), 200

@app.route('/delete', methods=['POST'])
def delete():
    user_id = request.json.get('user_id')
    if not user_id:
        app.logger.error("user_id is required")
        return jsonify({"error": "user_id is required"}), 400

    result = subprocess.run(['fprintd-delete', user_id], capture_output=True, text=True)
    if result.returncode != 0:
        app.logger.error(f"Deletion failed: {result.stderr}")
        return jsonify({"error": "Failed to delete fingerprint"}), 500

    return jsonify({"message": "Fingerprint deleted successfully"}), 200

@app.route('/delete-all', methods=['POST'])
def delete_all():
    result = subprocess.run(['fprintd-delete', '-a'], capture_output=True, text=True)
    if result.returncode != 0:
        app.logger.error(f"Deletion of all fingerprints failed: {result.stderr}")
        return jsonify({"error": "Failed to delete all fingerprints"}), 500

    return jsonify({"message": "All fingerprints deleted successfully"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
