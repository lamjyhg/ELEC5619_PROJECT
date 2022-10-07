package com.elec5619.backend.utils;

public class EmailHtmlHandlers {
//    <html>
//<head>
//<style>
//
//</style>
//</head>
//<body>
//<div style="width: 80%; border: 1px solid #80bfff;  padding:10px; margin: auto; background-color: #80bfff; border-radius: 10px">
//   <div style="width: 200px; height: 200px; margin: auto;"><img src="http://cdn.mcauto-images-production.sendgrid.net/896f038f42ffdd3f/81a5b1e3-e851-4e26-bf9e-02d750551746/1080x1080.png" style="width: 100%; height: 100%; "></img></div>
//    <p>Dear customer:</p>
//   <p >&nbsp;&nbsp;&nbsp;&nbsp;we are so sorry that one of your appointment has been cancelled by gym owner. Cancellation will show as below:</p>
//   <div style="width: 80%;padding: 10px; margin: auto;">
//      <p>ID: %s</p>
//      <p>Gym: %s</p>
//    <p>Start Time: %s</p>
//    <p>End Time: %s</p>
//      <p>Note:</p>
//      <p>&nbsp;&nbsp;&nbsp;&nbsp; %s</p>
//   </div>
//   <p >Gymmy; )</p>
//</div>
//</body>
//</html>

    public String getCancellationEmailHtml(String id, String gymName,
                                           String startTime, String endTime, String note) {
        String content = "<html>\n" +
                "<head>\n" +
                "<style>\n" +
                "\n" +
                "</style>\n" +
                "</head>\n" +
                "<body style=\"color: white;\">\n" +
                "<div style=\"width: 80%; border: 1px solid #80bfff;  padding:10px; margin: auto; background-color: #80bfff; border-radius: 10px\">\n" +
                "   <div style=\"width: 200px; height: 200px; margin: auto;\"><img src=\"http://cdn.mcauto-images-production.sendgrid.net/896f038f42ffdd3f/81a5b1e3-e851-4e26-bf9e-02d750551746/1080x1080.png\" style=\"width: 100%; height: 100%; \"></img></div>\n" +
                "   <p>Dear customer:</p>\n" +
                "   <p >&nbsp;&nbsp;&nbsp;&nbsp;we are so sorry that one of your appointment has been cancelled by gym owner. Cancellation will show as below:</p>\n" +
                "   <div style=\"width: 80%;padding: 10px; margin: auto;\">\n" +
                "      <p>ID: " + id + "</p>\n" +
                "      <p>Gym: " + gymName + "</p>\n" +
                "      <p>Start Time: " + startTime + "</p>\n" +
                "      <p>End Time: " + endTime + "</p>\n" +
                "      <p>Note:</p>\n" +
                "      <p>&nbsp;&nbsp;&nbsp;&nbsp; " + note + "</p>\n" +
                "   </div>\n" +
                "   <p >Gymmy; )</p>\n" +
                "</div>\n" +
                "</body>\n" +
                "</html>";
        return content;
    }
}
