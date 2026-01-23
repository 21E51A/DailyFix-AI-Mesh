resource "aws_route53_zone" "dailyfix" {
  name = "paiavula.com"
}

resource "aws_route53_record" "alb_record" {
  zone_id = aws_route53_zone.dailyfix.zone_id
  name    = "paiavula.com"
  type    = "A"

  alias {
    name                   = aws_lb.dailyfix_alb.dns_name
    zone_id                = aws_lb.dailyfix_alb.zone_id
    evaluate_target_health = true
  }
}
