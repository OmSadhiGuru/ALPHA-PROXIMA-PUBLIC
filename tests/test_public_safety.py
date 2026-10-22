import importlib.util
import pathlib
import unittest

MODULE_PATH = pathlib.Path(__file__).resolve().parents[1] / 'scripts' / 'check_public_safety.py'
spec = importlib.util.spec_from_file_location('public_safety', MODULE_PATH)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class PublicSafetyTests(unittest.TestCase):
    def test_blocks_omi_and_founder_state(self):
        issues = module.check_paths(['Omi/Memories.md', '13_OPERATIONS/Founder OS/state/founder-state.json'])
        self.assertGreaterEqual(len(issues), 2)

    def test_blocks_personal_folder_case_insensitively(self):
        self.assertGreaterEqual(len(module.check_paths(['12_people/private-note.md'])), 1)

    def test_blocks_credentials(self):
        self.assertGreater(len(module.check_paths(['config/.env.production', 'certs/private.pem'])), 0)

    def test_allows_public_site(self):
        self.assertEqual(module.check_paths(['public/index.html', 'public/assets/app.js', 'README.md']), [])

    def test_detects_github_token_like_string(self):
        synthetic = ('gh' + 'p_' + 'a' * 40).encode('ascii')
        self.assertNotEqual(module.check_content(synthetic, 'example.txt'), [])

    def test_does_not_log_sensitive_value(self):
        synthetic = ('gh' + 'p_' + 'a' * 40).encode('ascii')
        result = ' '.join(module.check_content(synthetic, 'example.txt'))
        self.assertNotIn(synthetic.decode('ascii'), result)

    def test_rejects_extra_markdown(self):
        self.assertTrue(module.check_paths(['public/private-notes.md']))

    def test_rejects_unapproved_image(self):
        self.assertTrue(module.check_paths(['public/photo.jpg']))

    def test_rejects_unsafe_archive(self):
        self.assertTrue(module.check_paths(['vault-export.zip']))

    def test_approved_release_manifest_has_only_expected_files(self):
        self.assertEqual(len(module.APPROVED_PATHS), 20)

    def test_allows_benign_text(self):
        self.assertEqual(module.check_content(b'Human governance, private-by-design.', 'README.md'), [])


if __name__ == '__main__':
    unittest.main()
