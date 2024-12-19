(function ($) {
  $(function () {
    initLangSlider();
    initTabs();
    initCalendar();
  });

  const initLangSlider = () => {
    $(document).ready(function() {
      $('#flag').on('click', function() {
          $('#langs-box').toggleClass('visible');
      });
  });  
  };

  const initTabs = () => {
    $(document).ready(function () {
      $(".tab-links a").on("click", function (e) {
        e.preventDefault();

        var currentAttrValue = $(this).attr("href");

        // Показать/скрыть вкладки
        $(".tab-content .tab").removeClass("active");
        $(currentAttrValue).addClass("active");

        // Изменить/удалить активную вкладку
        $(".tab-links li").removeClass("active");
        $(this).parent("li").addClass("active");

        // Добавление/удаление класса transparent к родителю
        if (currentAttrValue === "#tab2") {
          $(".streak-header").addClass("transparent");
        } else {
          $(".streak-header").removeClass("transparent");
        }
      });
    });
  };

  const initCalendar = () => {
    $(document).ready(function () {
      let currentDate = new Date();

      let months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ];

      function generateCalendar(year, month) {
        let firstDay = new Date(year, month, 1).getDay();
        let lastDate = new Date(year, month + 1, 0).getDate();

        let monthYearText = months[month] + " " + year;
        $(".month-year").text(monthYearText);
        $("tbody").empty();

        let row = $("<tr></tr>");
        for (let i = 1; i < firstDay; i++) {
          row.append("<td></td>");
        }

        for (let day = 1; day <= lastDate; day++) {
          if ((firstDay + day - 2) % 7 === 0 && day > 1) {
            $("tbody").append(row);
            row = $("<tr></tr>");
          }
          row.append("<td>" + day + "</td>");
        }
        $("tbody").append(row);

        // Подсветка текущей даты
        let today = new Date();
        if (year === today.getFullYear() && month === today.getMonth()) {
          $("tbody td")
            .filter(function () {
              return $(this).text() == today.getDate();
            })
            .addClass("selected");
        }

        $("tbody td").on("click", function () {
          $("tbody td").removeClass("active");
          $(this).addClass("active");
        });
      }

      function updateCalendar() {
        generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
      }

      $(".prev-month").on("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
      });

      $(".next-month").on("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
      });

      updateCalendar();
    });
  };
})(jQuery);
