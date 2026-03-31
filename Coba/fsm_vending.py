# 1. Aturan Main FSM (Transisi)
fsm_vending_machine = {
    'Idle': {
        'masukkan_uang': 'MenungguProduk'
    },
    'MenungguProduk': {
        'pilih_produk': 'MengeluarkanProduk'
    },
    'MengeluarkanProduk': {
        'keluarkan_produk': 'Selesai'
    },
    'Selesai': {
        'reset': 'Idle'
    }
}

# 2. Kondisi Awal
state_sekarang = 'Idle'

print("=== SIMULASI VENDING MACHINE ===")
print(f"Kondisi awal mesin: {state_sekarang}")

# 3. Loop agar mesin terus berjalan
while True:
    print("-" * 30)
    # Tampilkan pilihan input yang tersedia untuk state saat ini
    opsi_tersedia = list(fsm_vending_machine[state_sekarang].keys())
    print(f"Status saat ini: [{state_sekarang}]")
    print(f"Opsi yang bisa diketik: {opsi_tersedia} (atau ketik 'keluar')")
    
    # Ambil input dari user
    input_user = input("Masukkan perintah: ").lower().strip()

    if input_user == 'keluar':
        print("Program dihentikan.")
        break
    
    # Logika Perpindahan State
    if input_user in fsm_vending_machine[state_sekarang]:
        # Pindah ke state berikutnya
        state_sekarang = fsm_vending_machine[state_sekarang][input_user]
        print(f"BERHASIL: Sekarang mesin berada di kondisi: {state_sekarang}")
    else:
        print(f"GAGAL: Perintah '{input_user}' tidak bisa dilakukan saat status {state_sekarang}!")