<template>
  <header>
    <div class="container">
      <div class="logo">
        <a href="/"><img src="@/assets/roque/logo.png" alt="Logo roque"></a>
      </div>
      <nav>
        <ul>
          <li><a href="#home">Início</a></li>
          <li><a href="#about">Sobre</a></li>
          <li><a href="#services">Serviços</a></li>
          <li><a href="#contact">Contato</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  header {
    grid-area: header;
    background-color: #FFFFFF;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    height: fit-content;
    z-index: 1;
  }

  header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  header .logo img {
    margin-top: 10px;
    height: 50px;
  }

  header nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header nav ul li {
    margin: 0 5px;
    position: relative;
  }

  header nav ul li::after {
    content: '|';
    color: #303A73;
    margin-left: 10px;
  }

  header nav ul li:last-child::after {
    content: '';
  }

  header nav ul li a {
    color: #303A73;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  header nav ul li a:hover {
    color: #F2B705;
  }
</style>